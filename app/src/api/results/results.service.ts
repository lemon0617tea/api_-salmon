import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Result as ResultModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PaginatedRequestDtoForResult } from 'src/dto/pagination.dto';
import {
  BossCounts,
  EventType,
  PlayerResult,
  Results as UploadedResultsModel,
  WaterLevel,
} from '../dto/result.request.dto';
const { transpose } = require('matrix-transpose');

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  async find(salmonId: number): Promise<ResultModel> {
    return this.prisma.result
      .findUnique({
        where: {
          salmonId: salmonId,
        },
        rejectOnNotFound: true,
      })
      .catch((error) => {
        throw new NotFoundException();
      });
  }

  async findMany(query: PaginatedRequestDtoForResult): Promise<ResultModel[]> {
    return this.prisma.result.findMany({
      take: Number(query.limit),
      skip: Number(query.offset),
    });
  }

  countingArrayValue(value: BossCounts) {
    return Object.values(value).map((x) => {
      return x.count;
    });
  }

  // 同じリザルトを別の人がアップロードしたときにプレイヤーデータを更新する
  // 基本的には同じはずだが、回線落ちしたときなどの対策
  async updatePlayerResult() {}

  // 同じリザルトを別の人がアップロードしたときにリザルトをアップデートする
  async updateResult() {}

  // 同じリザルトを別の人がアップロードしたときにバイトデータをアップデートする
  // 基本的には同じはずだが、回線落ちしたときなどの対策
  async updateWaveResult() {}

  // リザルトを新規作成する
  async createResult() {}

  async create(request: UploadedResultsModel) {
    const result = request.results[0];
    const pid = result.my_result.pid
    // オオモノ出現数
    const boss_counts: number[] = Object.values(result.boss_counts).map(
      (value) => value.count,
    );
    // プレイヤー情報
    const players: PlayerResult[] = result.other_results.concat([
      result.my_result,
    ]);
    // オオモノ討伐数
    const boss_kill_counts = transpose(
      players.map((player) =>
        Object.values(player.boss_kill_counts).map((value) => value.count),
      ),
    ).map((value) => value.reduce((prev, next) => prev + next, 0));
    // プレイヤー固有ID
    const members = players.map((player) => player.pid).sort();

    await this.prisma.result.upsert({
      where: {
        playTime_members: {
          playTime: result.play_time,
          members: members,
        },
      },
      // 別のプレイヤーがリザルトを追加した場合
      // とりあえず何もしない
      update: {},
      create: {
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
                (value) => value.count,
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
              jobId: pid == player.pid ? result.job_id : null,
              jobScore: pid == player.pid ? result.job_score : null,
              kumaPoint: pid == player.pid ? result.kuma_point : null,
              jobRate: pid == player.pid ? result.job_rate : null,
              gradeId: pid == player.pid ? result.grade.id : null,
              gradePoint: pid == player.pid ? result.grade_point : null,
              gradePointDelta: pid == player.pid ? result.grade_point_delta : null,
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
                wave.water_level.key,
              ),
              goldenIkuraNum: wave.golden_ikura_num,
              goldenIkuraPopNum: wave.golden_ikura_pop_num,
              ikuraNum: wave.ikura_num,
              quotaNum: wave.quota_num,
              failureReason:
                result.job_result.failure_wave ==
                result.wave_details.indexOf(wave)
                  ? result.job_result.failure_reason.valueOf()
                  : null,
              isClear: !(
                result.job_result.failure_wave ==
                result.wave_details.indexOf(wave)
              ),
            };
          }),
        },
      },
    });
  }
}
