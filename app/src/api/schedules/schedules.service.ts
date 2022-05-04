import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  ScheduleRequest,
  ScheduleRequestBody,
} from 'src/dto/request/schedules.request';
import { PrismaService } from 'src/prisma.service';

import { schedules } from './coop.json';
export type CoopSchedule = typeof import('./coop.json');

@Injectable()
export class SchedulesService {
  constructor(private readonly prisma: PrismaService) {}

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
