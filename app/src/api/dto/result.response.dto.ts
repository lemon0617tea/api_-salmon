import { Prisma, Schedule } from '.prisma/client';

export class Wave {}

export class Player {}

export class Result {
  salmon_id: number;
  boss_counts: number[];
  boss_kill_counts: number[];
  danger_rate: number;
  end_time: number;
  play_time: number;
  start_time: number;
  failure_reason?: string;
  failure_wave?: number;
  is_clear: boolean;
  members: string[];
  players: Player[];
  waves: Wave[];
  schedule: Schedule;
}
