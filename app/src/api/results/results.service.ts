import { Injectable } from '@nestjs/common';
import { Prisma, Schedule } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { transpose } from 'matrix-transpose';

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}
}
