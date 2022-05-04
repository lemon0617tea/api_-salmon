import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Results } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ResultsCreateManyInput) {
    return;
  }
}
