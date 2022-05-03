import { ApiProperty } from '@nestjs/swagger';
import { EventType, WaterLevel } from '@prisma/client';

export class Waves {
  @ApiProperty({ type: 'integer' })
  salmon_id: number;
  @ApiProperty({ enum: EventType })
  event_type: EventType;
  @ApiProperty({ enum: WaterLevel })
  water_level: WaterLevel;
  @ApiProperty({ type: 'integer' })
  golden_ikura_num: number;
  @ApiProperty({ type: 'integer' })
  golden_ikura_pop_num: number;
  @ApiProperty({ type: 'integer' })
  ikura_num: number;
  @ApiProperty({ type: 'integer' })
  quota_num: number;
}
