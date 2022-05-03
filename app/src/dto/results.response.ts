import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { FailureReason, StageType, WeaponType } from '@prisma/client';

export namespace Results {
  class Schedule {
    @ApiProperty({ enum: StageType })
    stage_id: StageType;
    @ApiProperty({ type: 'integer' })
    start_time: number;
    @ApiProperty({ type: 'integer' })
    end_time: number;
    @ApiProperty({ enum: WeaponType })
    weapon_lists: WeaponType[];
  }

  class JobResult {
    @ApiProperty({ enum: FailureReason, nullable: true })
    failure_reason: FailureReason;
    @ApiProperty({ type: 'integer', nullable: true })
    failure_wave: number;
    @ApiProperty()
    is_clear: Boolean;
  }

  export class Response {
    @ApiProperty({ type: 'integer' })
    salmon_id: number;
    @ApiProperty({ type: [Number] })
    boss_counts: number[];
    @ApiProperty({ type: [Number] })
    boss_kill_counts: number[];
    @ApiProperty({ type: 'double' })
    danger_rate: number;
    @ApiProperty({ type: 'integer' })
    start_time: number;
    @ApiProperty({ type: 'integer' })
    end_time: number;
    @ApiProperty({ type: 'integer' })
    play_time: number;
    @ApiProperty()
    schedule: Schedule;
    @ApiProperty()
    job_results: JobResult;
  }
}
