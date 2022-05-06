import { ApiProperty } from '@nestjs/swagger';

export class CountedDto<T> {
  key: T;
  @ApiProperty({ type: 'integer' })
  count: number;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ type: 'integer' })
  total: number;
  @ApiProperty({ type: 'integer' })
  limit: number;
  @ApiProperty({ type: 'integer' })
  offset: number;
  results: T[];
}

export namespace Schedule {
  export class ScheduleMetadata {
    @ApiProperty({ type: 'integer' })
    start_time: number;
    @ApiProperty({ type: 'integer' })
    end_time: number;
    @ApiProperty({ type: 'integer', nullable: true })
    rare_weapon: number;
    @ApiProperty({ type: 'integer', example: 5000 })
    stage_id: number;
    @ApiProperty({ type: [Number], examples: [-2, -2, -2, -2] })
    weapon_lists: number[];
  }

  export class PaginatedResponse extends PaginatedResponseDto<ScheduleMetadata> {}

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
    schedule: ScheduleMetadata;
    @ApiProperty({ description: '統計' })
    my_result: Result;
    @ApiProperty({ description: '全国統計' })
    other_results: Result;
  }
}
