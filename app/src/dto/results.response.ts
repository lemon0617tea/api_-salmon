import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsIn, IsInt, Max, Min } from 'class-validator';

export namespace Results {
  class Schedule {
    @ApiProperty({ type: 'integer', description: 'ステージID' })
    stage_id: number;
    @ApiProperty({ type: 'integer', description: 'シフト開始時間' })
    start_time: number;
    @ApiProperty({ type: 'integer', description: 'シフト終了時間' })
    end_time: number;
    @ApiProperty({ type: 'integer', description: '支給ブキ' })
    weapon_lists: number[];
  }

  enum FailureReason {
    TIMELIMIT = 'time_limit',
    WIPEOUT = 'wipe_out',
  }

  export class JobResult {
    @IsEnum(FailureReason)
    @ApiProperty({
      enum: FailureReason,
      nullable: true,
      description: '失敗理由',
    })
    @IsInt()
    @Max(2)
    @Min(0)
    failure_reason: FailureReason;
    @ApiProperty({ type: 'integer', nullable: true, description: '失敗WAVE' })
    failure_wave: number;
    @IsBoolean()
    @ApiProperty({ description: 'クリアしたか' })
    is_clear: Boolean;
  }

  class Player {
    @ApiProperty({ description: 'プレイヤーID' })
    nsaid: string;
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
    @ApiProperty({ type: 'integer', description: '金イクラ納品数' })
    golden_ikura_num: number;
    @ApiProperty({ type: 'integer', description: '赤イクラ獲得数' })
    ikura_num: number;
    @ApiProperty({ type: 'integer', description: '救助数' })
    help_counts: number;
    @ApiProperty({ type: 'integer', description: '被救助数' })
    dead_counts: number;
    @ApiProperty({
      type: [Number],
      description: 'オオモノ討伐数',
      default: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    })
    boss_kill_counts: number[];
    @ApiProperty({ description: '支給ブキ' })
    weapon_lists: number[];
    @ApiProperty({ type: 'integer', description: 'スペシャルID' })
    special_id: number;
    @ApiProperty({
      type: [Number],
      description: 'スペシャル使用回数',
      default: [0, 0, 0],
    })
    special_counts: number[];
  }

  export class Response {
    @ApiProperty({ type: 'integer', description: 'ID' })
    salmon_id: number;
    @ApiProperty({
      type: [Number],
      description: 'オオモノ出現数',
      default: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    })
    boss_counts: number[];
    @ApiProperty({
      type: [Number],
      description: 'オオモノ討伐数',
      default: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    })
    boss_kill_counts: number[];
    @ApiProperty({ description: 'キケン度' })
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
    @ApiProperty({ type: [Player], description: 'プレイヤー記録' })
    player_results: Player[];
  }
}
