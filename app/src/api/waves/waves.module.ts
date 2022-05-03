import { Module } from '@nestjs/common';
import { WavesController } from './waves.controller';
import { WavesService } from './waves.service';

@Module({
  imports: [],
  controllers: [WavesController],
  providers: [WavesService],
})
export class WavesModule {}
