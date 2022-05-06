import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  ScheduleFilterDto,
  ScheduleRequest,
  ScheduleRequestBody,
} from 'src/dto/request/schedules.request';
import { PaginatedResponseDto, Schedule } from 'src/dto/schedule.response';
import { PrismaService } from 'src/prisma.service';

import { schedules } from './coop.json';
export type CoopSchedule = typeof import('./coop.json');

@Injectable()
export class SchedulesService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(
    request: ScheduleFilterDto,
  ): Promise<PaginatedResponseDto<Schedule.ScheduleMetadata>> {
    const response = new PaginatedResponseDto<Schedule.ScheduleMetadata>();
    response.total = await this.prisma.schedule.count();
    response.limit = request.limit;
    response.offset = request.offset;
    const results = (
      await this.prisma.schedule.findMany({
        skip: Number(request.offset),
        take: Number(request.limit),
        where: {
          stageId:
            request.stage_id === undefined
              ? undefined
              : Number(request.stage_id),
          rareWeapon:
            request.rare_weapon === undefined
              ? undefined
              : Number(request.rare_weapon),
        },
      })
    ).map((x) => {
      const result = new Schedule.ScheduleMetadata();
      result.start_time = x.startTime;
      result.end_time = x.endTime;
      result.stage_id = x.stageId;
      result.rare_weapon = x.rareWeapon;
      result.weapon_lists = x.weaponLists;
      return result;
    });
    response.results = results;
    return response;
  }

  async create() {
    const data = schedules.map((x) => {
      const schedule: Prisma.ScheduleCreateInput = {
        startTime: x.start_time,
        endTime: x.end_time,
        stageId: x.stage_id,
        rareWeapon: x.rare_weapon,
        weaponLists: x.weapon_list,
      };
      return schedule;
    });
    return await this.prisma
      .$transaction(async (prisma) => {
        return prisma.schedule.createMany({ data: data });
      })
      .catch(console.error)
      .finally(() => {
        this.prisma.$disconnect();
      });
  }
}
