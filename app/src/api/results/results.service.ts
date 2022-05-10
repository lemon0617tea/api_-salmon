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
}
