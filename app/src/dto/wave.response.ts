import { ApiProperty } from '@nestjs/swagger';
import { EventType, WaterLevel } from '@prisma/client';

export class Waves {
  @ApiProperty({ type: 'integer', description: 'ID' })
  salmon_id: number;
  @ApiProperty({ enum: EventType, description: 'イベント' })
  event_type: EventType;
  @ApiProperty({ enum: WaterLevel, description: '潮位' })
  water_level: WaterLevel;
  @ApiProperty({ type: 'integer', description: '金イクラ納品数' })
  golden_ikura_num: number;
  @ApiProperty({ type: 'integer', description: '金イクラ出現数' })
  golden_ikura_pop_num: number;
  @ApiProperty({ type: 'integer', description: '赤イクラ獲得数' })
  ikura_num: number;
  @ApiProperty({ type: 'integer', description: 'ノルマ' })
  quota_num: number;
}
