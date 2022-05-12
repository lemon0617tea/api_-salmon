import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty()
  event_type: number;
  @ApiProperty()
  water_level: number;
  @ApiProperty()
  golden_ikura_num: number;
  @ApiProperty()
  golden_ikura_pop_num: number;
  @ApiProperty()
  quota_num: number;
  @ApiProperty()
  ikura_num: number;
}

export interface PlayerResult {
  nsaid: string;
  boss_kill_counts: number[];
  dead_count: number;
  golden_ikura_num: number;
  help_count: number;
  ikura_num: number;
  name: string;
  special_id: number;
  special_count: number[];
  weapon_list: number[];
}

export class Player implements PlayerResult {
  @ApiProperty()
  nsaid: string;
  @ApiProperty()
  boss_kill_counts: number[];
  @ApiProperty()
  dead_count: number;
  @ApiProperty()
  golden_ikura_num: number;
  @ApiProperty()
  help_count: number;
  @ApiProperty()
  ikura_num: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  special_id: number;
  @ApiProperty()
  special_count: number[];
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
  @ApiProperty()
  failure_reason: FailureReason;
  @ApiProperty()
  failure_wave: number;
  @ApiProperty()
  is_clear: boolean;
}

export class Result {
  @ApiProperty()
  salmon_id: number;
  @ApiProperty()
  boss_counts: number[];
  @ApiProperty()
  boss_kill_counts: number[];
  @ApiProperty()
  danger_rate: number;
  @ApiProperty()
  end_time: number;
  @ApiProperty()
  play_time: number;
  @ApiProperty()
  start_time: number;
  @ApiProperty()
  members: string[];
  @ApiProperty()
  players: Player[];
  @ApiProperty()
  waves: Wave[];
  @ApiProperty()
  schedule: Schedule;
}
