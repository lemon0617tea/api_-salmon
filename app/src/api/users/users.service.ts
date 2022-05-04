import { Injectable } from '@nestjs/common';
import { Prisma, SplatNet2, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UsersCreateInput) {
    return await this.prisma
      .$transaction(async (prisma): Promise<Users> => {
        return await prisma.users.upsert({
          create: data,
          update: data,
          where: data,
        });
      })
      .catch(console.error)
      .finally(() => {
        this.prisma.$disconnect();
      });
  }

  async findAll(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async find(unique: Prisma.UsersWhereUniqueInput): Promise<Users> {
    return await this.prisma.$transaction(async (prisma): Promise<Users> => {
      return await prisma.users.findUnique({
        where: {
          uid: unique.uid,
        },
      });
    });
  }
}
