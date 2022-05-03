import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { S2SController } from './s2s/s2s.controller';
import { S2SService } from './s2s/s2s.service';
import { S2SModule } from './s2s/s2s.module';
import { ResultsModule } from './results/results.module';
import { RankingModule } from './ranking/ranking.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  controllers: [ApiController, S2SController, UsersController],
  providers: [ApiService, S2SService],
  imports: [S2SModule, ResultsModule, RankingModule, UsersModule, SchedulesModule],
})
export class ApiModule {}
