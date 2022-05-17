import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ResultsModule } from './results/results.module';
import { RankingModule } from './ranking/ranking.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { SchedulesModule } from './schedules/schedules.module';
import { UsersService } from './users/users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ApiController, UsersController],
  providers: [ApiService, UsersService, PrismaService],
  imports: [ResultsModule, RankingModule, UsersModule, SchedulesModule],
})
export class ApiModule {}
