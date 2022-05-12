import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Result as ResultModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PaginatedRequestDtoForResult } from 'src/dto/pagination.dto';
import {
  BossCounts,
  PlayerResult,
  Results as UploadedResultsModel,
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

  async create(request: UploadedResultsModel) {
    const result = request.results[0];
    const boss_counts: number[] = Object.values(result.boss_counts).map(
      (value) => value.count,
    );
    const players: PlayerResult[] = result.other_results.concat([
      result.my_result,
    ]);
    console.log(players);
    const boss_kill_counts = transpose(
      players.map((player) =>
        Object.values(player.boss_kill_counts).map((value) => value.count),
      ),
    ).map((value) => value.reduce((prev, next) => prev + next, 0));
    const members = players.map((player) => player.pid).sort();
    await this.prisma.result.upsert({
      where: {
        playTime_members: {
          playTime: result.play_time,
          members: members,
        },
      },
      update: {
        bossCounts: boss_counts,
        bossKillCounts: boss_kill_counts,
      },
      create: {
        bossCounts: boss_counts,
        bossKillCounts: boss_kill_counts,
        dangerRate: result.danger_rate,
        endTime: result.end_time,
        playTime: result.play_time,
        startTime: result.start_time,
        members: members,
      },
    });
  }
}
