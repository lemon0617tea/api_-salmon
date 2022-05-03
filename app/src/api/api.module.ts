import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { WavesModule } from './waves/waves.module';
import { S2SController } from './s2s/s2s.controller';
import { S2SService } from './s2s/s2s.service';
import { S2SModule } from './s2s/s2s.module';
import { ResultsModule } from './results/results.module';

@Module({
  controllers: [ApiController, S2SController],
  providers: [ApiService, S2SService],
  imports: [WavesModule, S2SModule, ResultsModule],
})
export class ApiModule {}
