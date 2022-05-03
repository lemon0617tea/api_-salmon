import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { FailureReason, StageType, WeaponType } from '@prisma/client';

export namespace Results {
  class Schedule {
    @ApiProperty({ enum: StageType, description: 'ステージID' })
    stage_id: StageType;
    @ApiProperty({ type: 'integer', description: 'シフト開始時間' })
    start_time: number;
    @ApiProperty({ type: 'integer', description: 'シフト終了時間' })
    end_time: number;
    @ApiProperty({ enum: WeaponType, description: '支給ブキ' })
    weapon_lists: WeaponType[];
  }

  class JobResult {
    @ApiProperty({
      enum: FailureReason,
      nullable: true,
      description: '失敗理由',
    })
    failure_reason: FailureReason;
    @ApiProperty({ type: 'integer', nullable: true, description: '失敗WAVE' })
    failure_wave: number;
    @ApiProperty({ description: 'クリアしたか' })
    is_clear: Boolean;
  }

  class Players {
    @ApiProperty({ type: 'integer', nullable: true, description: 'バイトID' })
    job_id: number;
    @ApiProperty({ type: 'integer', nullable: true, description: '評価レート' })
    grade_point: number;
    @ApiProperty({
      type: 'integer',
      nullable: true,
      description: '評価レート変動値',
    })
    grade_point_delta: number;
    @ApiProperty({
      type: 'integer',
      nullable: true,
      description: 'ジョブレート',
    })
    job_rate: number;
    @ApiProperty({
      type: 'integer',
      nullable: true,
      description: 'バイトスコア',
    })
    job_score: number;
    @ApiProperty({
      type: 'integer',
      nullable: true,
      description: 'クマサンポイント',
    })
    kuma_point: number;
  }

  export class Response {
    @ApiProperty({ type: 'integer', description: 'ID' })
    salmon_id: number;
    @ApiProperty({ type: [Number], description: 'オオモノ出現数' })
    boss_counts: number[];
    @ApiProperty({ type: [Number], description: 'オオモノ討伐数' })
    boss_kill_counts: number[];
    @ApiProperty({ type: 'double', description: 'キケン度' })
    danger_rate: number;
    @ApiProperty({ type: 'integer', description: 'シフト開始時間' })
    start_time: number;
    @ApiProperty({ type: 'integer', description: 'シフト終了時間' })
    end_time: number;
    @ApiProperty({ type: 'integer', description: 'プレイ時間' })
    play_time: number;
    @ApiProperty({ description: 'シフト' })
    schedule: Schedule;
    @ApiProperty({ description: 'リザルト' })
    job_results: JobResult;
    @ApiProperty({ type: Players, description: '個人リザルト' })
    my_result: Players;
    @ApiProperty({ type: [Players], description: '仲間リザルト' })
    other_results: Players[];
  }
}
