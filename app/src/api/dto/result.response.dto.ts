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
  event_type: number;
  water_level: number;
  golden_ikura_num: number;
  golden_ikura_pop_num: number;
  quota_num: number;
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

export class Schedule {
  start_time: number;
  stage_id: StageType;
  end_time: number;
  rare_weapon: number;
  weapon_list: number[];
}

export class JobResult {
  failure_reason: FailureReason;
  failure_wave: number;
  is_clear: boolean;
}

export class Result {
  salmon_id: number;
  boss_counts: number[];
  boss_kill_counts: number[];
  danger_rate: number;
  end_time: number;
  play_time: number;
  start_time: number;
  members: string[];
  players: Player[];
  waves: Wave[];
  schedule: Schedule;
}
