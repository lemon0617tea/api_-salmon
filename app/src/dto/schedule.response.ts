import { ApiProperty } from '@nestjs/swagger';
import { StageType, WeaponType } from '@prisma/client';

export class CountedDto<T> {
  key: T;
  @ApiProperty({ type: 'integer' })
  count: number;
}

export namespace Schedule {
  class Metadata {
    @ApiProperty({ type: 'integer' })
    start_time: number;
    @ApiProperty({ type: 'integer' })
    end_time: number;
    @ApiProperty({ enum: StageType })
    stage_id: StageType;
    @ApiProperty({ type: [WeaponType] })
    weapon_lists: WeaponType[];
  }

  export class Job {
    @ApiProperty({ type: 'integer', description: 'クリア回数' })
    clear: number;
    @ApiProperty({ type: 'integer', description: '失敗回数' })
    failure: number;
  }

  export class Result {
    @ApiProperty({ type: Schedule.Job, description: 'バイト結果' })
    job_result: Schedule.Job;
    @ApiProperty({ type: [Number], description: 'オオモノ出現数' })
    boss_counts: number[];
    @ApiProperty({ type: [Number], description: 'オオモノ討伐数' })
    boss_kill_counts: number[];
    @ApiProperty({ type: 'integer', description: '救助数合計' })
    help_counts: number;
    @ApiProperty({ type: 'integer', description: '被救助数合計' })
    dead_counts: number;
  }

  export class Stats {
    @ApiProperty()
    schedule: Metadata;
    @ApiProperty({ description: '統計' })
    my_result: Result;
    @ApiProperty({ description: '全国統計' })
    other_results: Result;
  }
}
