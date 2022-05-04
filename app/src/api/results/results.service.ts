import { Injectable } from '@nestjs/common';
import { Prisma, Schedule } from '@prisma/client';
import {
  ResultRequest,
  ResultRequestBody,
} from 'src/dto/request/results.request';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  createResult(result: ResultRequest): Prisma.ResultsCreateInput {
    return;
  }

  async create(request: ResultRequestBody) {
    return await this.prisma
      .$transaction(async (prisma) => {
        const result = request.results[0];
        await prisma.results.create({
          data: {
            bossCounts: [
              result.boss_counts[3].count,
              result.boss_counts[6].count,
              result.boss_counts[9].count,
              result.boss_counts[12].count,
              result.boss_counts[13].count,
              result.boss_counts[14].count,
              result.boss_counts[15].count,
              result.boss_counts[16].count,
              result.boss_counts[21].count,
            ],
            bossKillCounts: [
              result.boss_counts[3].count,
              result.boss_counts[6].count,
              result.boss_counts[9].count,
              result.boss_counts[12].count,
              result.boss_counts[13].count,
              result.boss_counts[14].count,
              result.boss_counts[15].count,
              result.boss_counts[16].count,
              result.boss_counts[21].count,
            ],
            dangerRate: result.danger_rate,
            endTime: result.end_time,
            playTime: result.play_time,
            startTime: result.start_time,
            failureReason: result.job_result.failure_reason,
            failureWave: result.job_result.failure_wave,
            isClear: result.job_result.is_clear.valueOf(),
          },
        });
      })
      .catch(console.error)
      .finally(() => {
        this.prisma.$disconnect();
      });
  }
}
