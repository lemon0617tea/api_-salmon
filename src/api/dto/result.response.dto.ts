import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';

export enum FailureReason {
  TIMELIMIT = 'time_limit',
  WIPEOUT = 'wipe_out',
}

export enum SpecialType {}

export enum BossType {}

export enum StageType {
  SHKAUP = 5000,
  SHAKESHIP = 5001,
  SHAKEHOUSE = 5002,
  SHAKELIFT = 5003,
  SHAKELIDE = 5004,
}

export interface WaveResult {
  event_type: number;
  water_level: number;
  golden_ikura_num: number;
  golden_ikura_pop_num: number;
  quota_num: number;
  ikura_num: number;
}

export class Wave implements WaveResult {
  @Expose()
  @ApiProperty()
  event_type: number;
  @Expose()
  @ApiProperty()
  water_level: number;
  @Expose()
  @ApiProperty()
  golden_ikura_num: number;
  @Expose()
  @ApiProperty()
  golden_ikura_pop_num: number;
  @Expose()
  @ApiProperty()
  quota_num: number;
  @Expose()
  @ApiProperty()
  ikura_num: number;
}

interface PlayerResultType {
  nsaid: string;
  boss_kill_counts: number[];
  dead_count: number;
  golden_ikura_num: number;
  help_count: number;
  ikura_num: number;
  name: string;
  special_id: number;
  special_counts: number[];
  weapon_list: number[];
}

export class Player implements PlayerResultType {
  @Expose()
  @ApiProperty()
  nsaid: string;
  @Expose()
  @ApiProperty()
  name: string;
  @Expose()
  @ApiProperty()
  boss_kill_counts: number[];
  @Expose()
  @ApiProperty()
  dead_count: number;
  @Expose()
  @ApiProperty()
  golden_ikura_num: number;
  @Expose()
  @ApiProperty()
  help_count: number;
  @Expose()
  @ApiProperty()
  ikura_num: number;
  @Expose()
  @ApiProperty()
  special_id: number;
  @Expose()
  @ApiProperty()
  special_counts: number[];
  @Expose()
  @ApiProperty()
  weapon_list: number[];
}

export class Schedule {
  @ApiProperty()
  start_time: number;
  @ApiProperty()
  stage_id: StageType;
  @ApiProperty()
  end_time: number;
  @ApiProperty()
  rare_weapon: number;
  @ApiProperty()
  weapon_list: number[];
}

export class JobResult {
  @Expose()
  @ApiProperty()
  failure_reason: FailureReason;
  @Expose()
  @ApiProperty()
  failure_wave: number;
  @Expose()
  @ApiProperty()
  is_clear: boolean;
}

export class Result {
  @Expose()
  @ApiProperty()
  salmon_id: number;
  @Expose()
  @ApiProperty()
  boss_counts: number[];
  @Expose()
  @ApiProperty()
  boss_kill_counts: number[];
  @Expose()
  @ApiProperty()
  danger_rate: number;
  @Expose()
  @ApiProperty()
  end_time: number;
  @Expose()
  @ApiProperty()
  play_time: number;
  @Expose()
  @ApiProperty()
  start_time: number;
  @Expose()
  @ApiProperty()
  members: string[];
  @Expose()
  @Type(() => JobResult)
  @ApiProperty()
  job_result: JobResult;
  @Expose()
  @Type(() => Player)
  @ApiProperty()
  players: Player[];
  @Expose()
  @Type(() => Wave)
  @ApiProperty()
  waves: Wave[];
  @Expose()
  @Type(() => Schedule)
  @ApiProperty()
  schedule: Schedule;
}
