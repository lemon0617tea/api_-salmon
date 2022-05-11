import { Injectable, NotFoundException } from '@nestjs/common';
import { Result as ResultModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { transpose } from 'matrix-transpose';
import {
  PaginatedRequestDto,
  PaginatedRequestDtoForResult,
} from 'src/dto/pagination.dto';

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  async find(salmonId: number): Promise<ResultModel> {
    return this.prisma.result
      .findUnique({
        where: {
          salmonId: salmonId,
        },
        rejectOnNotFound: true,
      })
      .catch((error) => {
        throw new NotFoundException();
      });
  }

  async findMany(query: PaginatedRequestDtoForResult): Promise<ResultModel[]> {
    return this.prisma.result.findMany({
      take: Number(query.limit),
      skip: Number(query.offset),
    });
  }
}
