import { Injectable } from '@nestjs/common';
import { Prisma, Schedule } from '@prisma/client';
import {
  EventType,
  PlayerRequest,
  ResultRequest,
  ResultRequestBody,
  WaterLevel,
} from 'src/dto/request/results.request';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  createPlayers(
    request: PlayerRequest[],
  ): Prisma.PlayersCreateWithoutResultsInput {
    const players = request
      .sort((x, y) => (x.pid < y.pid ? 1 : 0))
      .map((x) => {
        return x.pid;
      });
    console.log(players);
    return;
  }

  createWaves(
    request: ResultRequest,
    failureWave: Number,
  ): Prisma.WavesCreateWithoutResultsInput[] {
    const waves = request.wave_details.map((x, index) => {
      const wave: Prisma.WavesCreateWithoutResultsInput = {
        eventType: Object.keys(EventType).indexOf(x.event_type.key),
        waterLevel: Object.keys(WaterLevel).indexOf(x.water_level.key),
        goldenIkuraNum: x.golden_ikura_num,
        goldenIkuraPopNum: x.golden_ikura_pop_num,
        ikuraNum: x.ikura_num,
        quotaNum: x.quota_num,
        index: index,
        isClear: failureWave === index ? true : false,
      };
      return wave;
    });
    return waves;
  }

  createResults(request: ResultRequest): Prisma.ResultsCreateInput {
    this.createWaves(request, request.job_result.failure_wave);
    this.createPlayers(request.other_results.concat(request.my_result));
    return;
  }

  async create(request: ResultRequestBody) {
    request.results.map((x) => this.createResults(x));
    return;
  }
}
