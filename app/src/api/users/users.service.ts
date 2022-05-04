import { Injectable } from '@nestjs/common';
import { Prisma, SplatNet2, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UsersCreateInput): Promise<Users> {
    return this.prisma.users.create({ data });
  }

  async findAll(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async find(input: Prisma.SplatNet2WhereUniqueInput): Promise<SplatNet2> {
    return this.prisma.splatNet2.findUnique({ where: input });
  }
}
