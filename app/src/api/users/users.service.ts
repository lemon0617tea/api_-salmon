import { User, User as UserModel } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(skip: number, take: number): Promise<UserModel[]> {
    return await this.prisma.user.findMany({
      skip: skip || undefined,
      take: take || undefined,
    });
  }

  async find(nsaid: number): Promise<UserModel> {
    return await this.prisma.user
      .findUnique({
        where: { id: nsaid },
        rejectOnNotFound: true,
      })
      .catch((error) => {
        throw new NotFoundException();
      });
  }
}
