import { ApiInternalServerErrorResponse, ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  min,
  Min,
  ValidateNested,
} from 'class-validator';
import { FailureReason, SpecialType } from './result.response.dto';

enum BossType {
  GOLDEN = 'sakelien-golden',
  BOMBER = 'sakelien-bomber',
  TWINS = 'sakelien-cup-twins',
  SHIELD = 'sakelien-shield',
  SNAKE = 'sakelien-snake',
  TOWER = 'sakelien-tower',
  DIVER = 'sakediver',
  DOZER = 'sakedozer',
  ROCKET = 'sakerocket',
}

class BossCount {
  @ApiProperty()
  @ValidateNested()
  boss: EnumType<BossType>;
  @IsInt()
  @Min(0)
  @ApiProperty()
  count: number;
}

class BossCounts {
  @ApiProperty()
  @ValidateNested()
  '3': BossCount;
  @ApiProperty()
  @ValidateNested()
  '6': BossCount;
  @ApiProperty()
  @ValidateNested()
  '9': BossCount;
  @ApiProperty()
  @ValidateNested()
  '12': BossCount;
  @ApiProperty()
  @ValidateNested()
  '13': BossCount;
  @ApiProperty()
  @ValidateNested()
  '14': BossCount;
  @ApiProperty()
  @ValidateNested()
  '15': BossCount;
  @ApiProperty()
  @ValidateNested()
  '16': BossCount;
  @ApiProperty()
  @ValidateNested()
  '21': BossCount;
}

class Grade {
  @Expose()
  @Transform((param) => {
    parseInt(param.value, 10);
  })
  @Max(5)
  @Min(0)
  @ApiProperty()
  id: number;
  @ApiProperty()
  long_name: string;
  @ApiProperty()
  short_name: string;
}

class JobResult {
  @IsOptional()
  @IsInt()
  @Max(3)
  @Min(1)
  @ApiProperty()
  failure_wave: number;
  @IsOptional()
  @ApiProperty()
  @ValidateNested()
  failure_reason: FailureReason;
  @IsBoolean()
  @ApiProperty()
  is_clear: boolean;
}

enum PlayerStyle {
  GIRL = 'girl',
  BOY = 'boy',
}

enum Species {
  INKLING = 'inkling',
  OCTOLING = 'octoling',
}

class PlayerType {
  @ApiProperty()
  @ValidateNested()
  style: PlayerStyle;
  @ApiProperty()
  species: Species;
}

class Special {
  @Expose()
  @Transform((param) => {
    parseInt(param.value, 10);
  })
  @Max(9)
  @Min(0)
  @ApiProperty()
  id: number;
  @ApiProperty()
  image_a: string;
  @ApiProperty()
  image_b: string;
}

class Weapon {
  @Expose()
  @Transform((param) => {
    parseInt(param.value, 10);
  })
  @ApiProperty()
  id: number;
  @ApiProperty()
  image: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  thumbnail: string;
}

class WeaponList {
  @Expose()
  @Transform((param) => {
    parseInt(param.value, 10);
  })
  @ApiProperty()
  id: number;
  @ApiProperty()
  @ValidateNested()
  weapon: Weapon;
}
class PlayerResult {
  @ApiProperty()
  @ValidateNested()
  boss_kill_count: BossCounts;
  @IsInt()
  @Min(0)
  @ApiProperty()
  dead_count: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  golden_ikura_num: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  help_count: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  ikura_num: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  pid: string;
  @ApiProperty()
  @ValidateNested()
  player_type: PlayerType;
  @ApiProperty()
  @ValidateNested()
  special: Special;
  @ApiProperty()
  @ValidateNested({ each: true })
  weapon_list: WeaponList[];
}

enum WaterLevel {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
}

enum EventType {
  WATERLEVELS = 'water-levels',
  RUSH = 'rush',
  GEYSER = 'goldie-seeking',
  GRILLER = 'griller',
  RALLY = 'the-mothership',
  FOG = 'fog',
  MISSILE = 'cohock-charge',
}

enum StageType {
  SHAKEUP = '/images/coop_stage/65c68c6f0641cc5654434b78a6f10b0ad32ccdee.png',
  SHAKESHIP = '/images/coop_stage/e07d73b7d9f0c64e552b34a2e6c29b8564c63388.png',
  SHAKEHOUSE = '/images/coop_stage/6d68f5baa75f3a94e5e9bfb89b82e7377e3ecd2c.png',
  SHAKELIFT = '/images/coop_stage/e9f7c7b35e6d46778cd3cbc0d89bd7e1bc3be493.png',
  SHAKERIDE = '/images/coop_stage/50064ec6e97aac91e70df5fc2cfecf61ad8615fd.png',
}

class EnumType<T> {
  @ApiProperty()
  key: T;
  @ApiProperty()
  name: string;
}

class EnumImageType<T> {
  @ApiProperty()
  image: T;
  @ApiProperty()
  name: string;
}

class Schedule {
  @IsInt()
  @ApiProperty()
  start_time: number;
  @IsInt()
  @ApiProperty()
  end_time: number;
  @ApiProperty()
  @ValidateNested()
  stage: EnumImageType<StageType>;
}

class WaveResult {
  @ApiProperty()
  @ValidateNested()
  water_level: EnumType<WaterLevel>;
  @ApiProperty()
  @ValidateNested()
  event_type: EnumType<EventType>;
  @IsInt()
  @Min(0)
  @ApiProperty()
  golden_ikura_num: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  golden_ikura_pop_num: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  ikura_num: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  quota_num: number;
}

class Result {
  @ApiProperty()
  @ValidateNested()
  boss_counts: BossCounts;
  @IsNumber()
  @ApiProperty()
  danger_rate: number;
  @IsInt()
  @ApiProperty()
  end_time: number;
  @ApiProperty()
  @ValidateNested()
  grade: Grade;
  @IsInt()
  @Min(999)
  @Min(0)
  @ApiProperty()
  grade_point: number;
  @IsInt()
  @Min(20)
  @Min(-20)
  @ApiProperty()
  grade_point_delta: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  job_id: number;
  @IsInt()
  @Max(435)
  @Min(0)
  @ApiProperty()
  job_rate: number;
  @ApiProperty()
  @ValidateNested()
  job_result: JobResult;
  @IsInt()
  @ApiProperty()
  job_score: number;
  @IsInt()
  @ApiProperty()
  kuma_point: number;
  @ApiProperty()
  @ValidateNested()
  my_result: PlayerResult;
  @ApiProperty()
  @ValidateNested({ each: true })
  other_results: PlayerResult[];
  @IsInt()
  @ApiProperty()
  play_time: number;
  @ApiProperty()
  @ValidateNested()
  player_time: PlayerType;
  @ApiProperty()
  @ValidateNested()
  schedule: Schedule;
  @IsInt()
  @ApiProperty()
  start_time: number;
  @ApiProperty()
  @ValidateNested({ each: true })
  wave_details: WaveResult[];
}

export class Results {
  @ApiProperty()
  @ValidateNested({ each: true })
  results: Result[];
}
