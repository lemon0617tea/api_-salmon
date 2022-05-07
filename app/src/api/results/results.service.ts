import { Injectable } from '@nestjs/common';
import { Prisma, Schedule } from '@prisma/client';
import {
  BossCounts,
  EventType,
  PlayerRequest,
  ResultRequest,
  ResultRequestBody,
  StageURL,
  WaterLevel,
} from 'src/dto/request/results.request';
import { PrismaService } from 'src/prisma.service';
import { transpose } from 'matrix-transpose';

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  createOthers(
    request: ResultRequest,
  ): Prisma.PlayersCreateWithoutResultsInput[] {
    return request.other_results.map((x) => {
      return {
        nsaid: x.pid,
        bossKillCounts: this.bossKillCounts(x.boss_kill_counts),
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
        weaponList: x.weapon_list.map((x) => {
          return Number(x.id);
        }),
      };
    });
  }

  bossKillCounts(request: BossCounts): number[] {
    return Object.values(request).map((x) => {
      return x.count;
    });
  }

  createPlayers(
    request: ResultRequest,
  ): Prisma.PlayersCreateWithoutResultsInput {
    return {
      nsaid: request.my_result.pid,
      bossKillCounts: this.bossKillCounts(request.my_result.boss_kill_counts),
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
      weaponList: request.my_result.weapon_list.map((x) => {
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
        eventType: Object.values(EventType).indexOf(x.event_type.key),
        waterLevel: Object.values(WaterLevel).indexOf(x.water_level.key),
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
    const boss_kill_counts = transpose(
      request.other_results
        .map((x) => {
          return x.boss_kill_counts;
        })
        .concat(request.my_result.boss_kill_counts)
        .map((x) => {
          return this.bossKillCounts(x);
        }),
    ).map((x) => {
      return x.reduce((a, b) => a + b, 0);
    });
    const members: string[] = players.map((x) => x.nsaid);
    return {
      bossCounts: this.bossKillCounts(request.boss_counts),
      bossKillCounts: boss_kill_counts,
      dangerRate: request.danger_rate,
      endTime: request.end_time,
      members: members,
      playTime: request.play_time,
      startTime: request.start_time,
      isClear: request.job_result.is_clear.valueOf(),
      failureReason:
        request.job_result.failure_reason == null
          ? null
          : request.job_result.failure_reason.valueOf(),
      failureWave: request.job_result.failure_wave,
      stageId:
        Object.values(StageURL).indexOf(request.schedule.stage.image) + 5000,
      weaponLists: request.schedule.weapons.map((x) => {
        return Number(x.id);
      }),
      // waves: {
      //   createMany: {
      //     data: waves,
      //   },
      // },
    };
  }

  async create(request: ResultRequestBody) {
    const results: Prisma.ResultsCreateInput[] = request.results.map((x) =>
      this.createResults(x),
    );
    this.prisma.results
      .createMany({
        data: results,
        skipDuplicates: true,
      })
      .catch(console.error)
      .finally(() => {
        console.log('done');
      });
    return;
  }
}
