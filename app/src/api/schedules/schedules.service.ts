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

  async findMany() {}

  async find() {}

  async create() {}
}
