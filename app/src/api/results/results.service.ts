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

  createOthers(
    request: ResultRequest,
  ): Prisma.PlayersCreateWithoutResultsInput[] {
    return request.other_results.map((x) => {
      console.log(x);
      return {
        nsaid: x.pid,
        deadCount: x.dead_count,
        goldenIkuraNum: x.golden_ikura_num,
        helpCount: x.help_count,
        ikuraNum: x.help_count,
        jobId: null,
        jobScore: null,
        jobRate: null,
        kumaPoint: null,
        gradeId: null,
        gradePoint: null,
        gradePointDelta: null,
        name: x.name,
        species: x.player_type.species,
        style: x.player_type.style,
        specialId: Number(x.special.id),
        specialCount: x.special_counts,
        weaponList: x.weapon_lists.map((x) => {
          return Number(x.id);
        }),
      };
    });
  }

  createPlayers(
    request: ResultRequest,
  ): Prisma.PlayersCreateWithoutResultsInput {
    return {
      nsaid: request.my_result.pid,
      deadCount: request.my_result.dead_count,
      goldenIkuraNum: request.my_result.golden_ikura_num,
      helpCount: request.my_result.help_count,
      ikuraNum: request.my_result.help_count,
      jobId: request.job_id,
      jobScore: request.job_score,
      jobRate: request.job_rate,
      kumaPoint: request.kuma_point,
      gradeId: Number(request.grade.id),
      gradePoint: request.grade_point,
      gradePointDelta: request.grade_point_delta,
      name: request.my_result.name,
      species: request.my_result.player_type.species,
      style: request.my_result.player_type.style,
      specialId: Number(request.my_result.special.id),
      specialCount: request.my_result.special_counts,
      weaponList: request.my_result.weapon_lists.map((x) => {
        return Number(x.id);
      }),
    };
  }

  createWaves(
    request: ResultRequest,
    failureWave: Number,
  ): Prisma.WavesCreateWithoutResultsInput[] {
    return request.wave_details.map((x, index) => {
      return {
        eventType: Object.keys(EventType).indexOf(x.event_type.key),
        waterLevel: Object.keys(WaterLevel).indexOf(x.water_level.key),
        goldenIkuraNum: x.golden_ikura_num,
        goldenIkuraPopNum: x.golden_ikura_pop_num,
        ikuraNum: x.ikura_num,
        quotaNum: x.quota_num,
        index: index,
        isClear: failureWave === index ? true : false,
      };
    });
  }

  createResults(request: ResultRequest): Prisma.ResultsCreateInput {
    const players: Prisma.PlayersCreateWithoutResultsInput[] =
      this.createOthers(request)
        .concat(this.createPlayers(request))
        .sort((x, y) => (x.nsaid < y.nsaid ? 1 : 0));
    const waves: Prisma.WavesCreateWithoutResultsInput[] = this.createWaves(
      request,
      request.job_result.failure_wave,
    );
    return;
  }

  async create(request: ResultRequestBody) {
    request.results.map((x) => this.createResults(x));
    return;
  }
}
