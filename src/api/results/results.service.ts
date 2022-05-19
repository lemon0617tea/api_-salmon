import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma, Result as ResultModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import {
  BossCounts,
  EventType,
  PlayerResult,
  Result as UploadedResultModel,
  Results as UploadedResultsModel,
  WaterLevel,
} from '../dto/result.request.dto';
import dayjs from 'dayjs';
import { Status, UploadResult, UploadResults } from './results.status';
import {
  PaginatedDto,
  PaginatedRequestDtoForResult,
} from '../dto/pagination.dto';
import { plainToClass } from 'class-transformer';
import { Result as ResultDto } from '../dto/result.response.dto';
const { transpose } = require('matrix-transpose');
const snakecaseKeys = require('snakecase-keys');

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  convertToJSON(result: ResultModel): ResultDto {
    return plainToClass(ResultDto, snakecaseKeys, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }

  async find(salmonId: number): Promise<ResultDto> {
    try {
      const result = await this.prisma.result.findUnique({
        where: {
          salmonId: salmonId,
        },
        include: {
          players: true,
          waves: true,
          jobResult: true,
        },
        rejectOnNotFound: true,
      });
      return plainToClass(ResultDto, snakecaseKeys(result), {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });
    } catch (error) {
      console.log(error);
      throw new NotFoundException();
    }
  }

  async findMany(
    query: PaginatedRequestDtoForResult
  ): Promise<PaginatedDto<ResultDto>> {
    console.log(query);
    const response = new PaginatedDto<ResultDto>();
    const results = this.prisma.result.findMany({
      take: query.limit,
      skip: query.offset,
      include: {
        players: true,
        waves: true,
        jobResult: true,
      },
    });
    response.limit = query.limit;
    response.offset = query.offset;
    response.results = (await results).map((result) =>
      plainToClass(ResultDto, snakecaseKeys(result), {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      })
    );
    return response;
  }

  // 同じリザルトを別の人がアップロードしたときにプレイヤーデータを更新する
  // 基本的には同じはずだが、回線落ちしたときなどの対策
  async updatePlayerResult() {}

  // 同じリザルトを別の人がアップロードしたときにバイトデータをアップデートする
  // 基本的には同じはずだが、回線落ちしたときなどの対策
  async updateWaveResult() {}

  // 重複しているリザルトIDを返す
  // 新規リザルトであればnullを返す
  async getResultSalmonId(result: UploadedResultModel): Promise<number> {
    const members: string[] = result.other_results
      .concat([result.my_result])
      .map((player) => player.pid)
      .sort();
    try {
      return (
        await this.prisma.result.findFirst({
          where: {
            playTime: {
              lte: dayjs(result.play_time).add(10, 'second').toDate(),
              gte: dayjs(result.play_time).subtract(10, 'second').toDate(),
            },
            members: {
              equals: members,
            },
          },
        })
      ).salmonId;
    } catch (error) {
      return null;
    }
  }

  async createResult(result: UploadedResultModel): Promise<number> {
    const boss_counts: number[] = Object.values(result.boss_counts).map(
      (value) => value.count
    );
    const players: PlayerResult[] = result.other_results.concat([
      result.my_result,
    ]);
    const boss_kill_counts = transpose(
      players.map((player) =>
        Object.values(player.boss_kill_counts).map((value) => value.count)
      )
    ).map((value) => value.reduce((prev, next) => prev + next, 0));
    const members = players.map((player) => player.pid).sort();
    if (new Set(members).size !== members.length) {
      throw new BadRequestException();
    }
    const response = await this.prisma.result.create({
      data: {
        bossCounts: boss_counts,
        bossKillCounts: boss_kill_counts,
        dangerRate: result.danger_rate,
        endTime: result.end_time,
        playTime: result.play_time,
        startTime: result.start_time,
        jobResult: {
          create: {
            failureReason: result.job_result.failure_reason,
            failureWave: result.job_result.failure_wave,
            isClear: result.job_result.is_clear,
          },
        },
        players: {
          create: players.map((player) => {
            return {
              name: player.name,
              nsaid: player.pid,
              bossKillCounts: Object.values(player.boss_kill_counts).map(
                (value) => value.count
              ),
              deadCount: player.dead_count,
              helpCount: player.help_count,
              goldenIkuraNum: player.golden_ikura_num,
              ikuraNum: player.ikura_num,
              style: player.player_type.style,
              species: player.player_type.species,
              specialId: player.special.id,
              weaponList: player.weapon_list.map((value) => value.id),
              specialCounts: player.special_counts,
              jobId: result.my_result.pid == player.pid ? result.job_id : null,
              jobScore:
                result.my_result.pid == player.pid ? result.job_score : null,
              kumaPoint:
                result.my_result.pid == player.pid ? result.kuma_point : null,
              jobRate:
                result.my_result.pid == player.pid ? result.job_rate : null,
              gradeId:
                result.my_result.pid == player.pid ? result.grade.id : null,
              gradePoint:
                result.my_result.pid == player.pid ? result.grade_point : null,
              gradePointDelta:
                result.my_result.pid == player.pid
                  ? result.grade_point_delta
                  : null,
            };
          }),
        },
        members: members,
        waves: {
          create: result.wave_details.map((wave) => {
            return {
              waveId: result.wave_details.indexOf(wave),
              eventType: Object.values(EventType).indexOf(wave.event_type.key),
              waterLevel: Object.values(WaterLevel).indexOf(
                wave.water_level.key
              ),
              goldenIkuraNum: wave.golden_ikura_num,
              goldenIkuraPopNum: wave.golden_ikura_pop_num,
              ikuraNum: wave.ikura_num,
              quotaNum: wave.quota_num,
              failureReason:
                result.job_result.failure_wave ==
                result.wave_details.indexOf(wave) + 1
                  ? result.job_result.failure_reason.valueOf()
                  : null,
              isClear: !(
                result.job_result.failure_wave ==
                result.wave_details.indexOf(wave) + 1
              ),
            };
          }),
        },
      },
    });
    return response.salmonId;
  }

  async updateResult(
    salmonId: number,
    result: UploadedResultModel
  ): Promise<number> {
    try {
      return (
        await this.prisma.result.update({
          where: {
            salmonId: salmonId,
          },
          data: {
            players: {
              update: {
                where: {
                  resultId_nsaid: {
                    resultId: salmonId,
                    nsaid: result.my_result.pid,
                  },
                },
                data: {
                  jobId: result.job_id,
                  jobScore: result.job_score,
                  kumaPoint: result.kuma_point,
                  jobRate: result.job_rate,
                  gradeId: result.grade.id,
                  gradePoint: result.grade_point,
                  gradePointDelta: result.grade_point_delta,
                },
              },
            },
          },
        })
      ).salmonId;
    } catch (error) {
      throw new InternalServerErrorException(null, 'Could not update result.');
    }
  }

  async create(request: UploadedResultsModel): Promise<UploadResults> {
    const results = await Promise.all(
      request.results.map(async (result) => {
        const salmonId = await this.getResultSalmonId(result);
        if (salmonId == null) {
          const salmonId = await this.createResult(result);
          return new UploadResult(salmonId, Status.Created);
        } else {
          await this.updateResult(salmonId, result);
          return new UploadResult(salmonId, Status.Updated);
        }
      })
    );
    return new UploadResults(results);
  }
}
