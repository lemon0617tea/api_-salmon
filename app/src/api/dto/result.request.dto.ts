import { ParseEnumPipe } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  min,
  Min,
  ValidateNested,
} from 'class-validator';
import { FailureReason, SpecialType } from './result.response.dto';

enum PlayerStyle {
  GIRL = 'girl',
  BOY = 'boy',
}

enum Species {
  INKLINGS = 'inklings',
  OCTOLINGS = 'octolings',
}

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

// interface EnumType<T> {
//   key: T;
//   name: string;
// }

class EnumType<T> {
  @ApiProperty({ type: String })
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
  @Type(() => BossCount)
  '3': BossCount;
  @ApiProperty()
  @ValidateNested()
  @Type(() => BossCount)
  '6': BossCount;
  @ApiProperty()
  @ValidateNested()
  @Type(() => BossCount)
  '9': BossCount;
  @ApiProperty()
  @ValidateNested()
  @Type(() => BossCount)
  '12': BossCount;
  @ApiProperty()
  @ValidateNested()
  @Type(() => BossCount)
  '13': BossCount;
  @ApiProperty()
  @ValidateNested()
  @Type(() => BossCount)
  '14': BossCount;
  @ApiProperty()
  @ValidateNested()
  @Type(() => BossCount)
  '15': BossCount;
  @ApiProperty()
  @ValidateNested()
  @Type(() => BossCount)
  '16': BossCount;
  @ApiProperty()
  @ValidateNested()
  @Type(() => BossCount)
  '21': BossCount;
}

class Grade {
  @Expose()
  @Transform((param) => parseInt(param.value, 10))
  @IsInt()
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
  @ApiProperty({ example: 1 })
  failure_wave: number;
  @IsOptional()
  @ApiProperty({ enum: FailureReason, example: FailureReason.TIMELIMIT })
  failure_reason: FailureReason;
  @IsBoolean()
  @ApiProperty({ example: false })
  is_clear: boolean;
}

class PlayerType {
  @ApiProperty({ enum: PlayerStyle })
  style: PlayerStyle;
  @ApiProperty({ enum: Species })
  species: Species;
}

class Special {
  @Expose()
  @Transform((param) => parseInt(param.value, 10))
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
  @Transform((param) => parseInt(param.value, 10))
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
  @Transform((param) => parseInt(param.value, 10))
  @IsInt()
  @ApiProperty()
  id: number;
  @ApiProperty()
  @ValidateNested()
  @Type(() => Weapon)
  weapon: Weapon;
}

class PlayerResult {
  @ApiProperty()
  @ValidateNested()
  @Type(() => BossCounts)
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
  @Type(() => PlayerType)
  player_type: PlayerType;
  @ApiProperty()
  @ValidateNested()
  @Type(() => Special)
  special: Special;
  @ApiProperty({ type: [WeaponList] })
  @ValidateNested({ each: true })
  @Type(() => WeaponList)
  weapon_list: WeaponList[];
}

class Schedule {
  @Expose()
  @Transform((param) => new Date(param.value * 1000).toISOString())
  @IsDateString()
  @ApiProperty()
  start_time: string;
  @Expose()
  @Transform((param) => new Date(param.value * 1000).toISOString())
  @IsDateString()
  @ApiProperty()
  end_time: string;
  @ApiProperty()
  @ValidateNested()
  @Type(() => EnumImageType)
  stage: EnumImageType<StageType>;
}

class WaveResult {
  @ApiProperty()
  @ValidateNested()
  @Type(() => EnumType)
  water_level: EnumType<WaterLevel>;
  @ApiProperty()
  @ValidateNested()
  @Type(() => EnumType)
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
  @Type(() => BossCounts)
  boss_counts: BossCounts;
  @IsNumber()
  @ApiProperty()
  danger_rate: number;
  @Expose()
  @Transform((param) => new Date(param.value * 1000).toISOString())
  @IsDateString()
  @ApiProperty()
  end_time: string;
  @ApiProperty()
  @ValidateNested()
  @Type(() => Grade)
  grade: Grade;
  @IsInt()
  @Max(999)
  @Min(0)
  @ApiProperty()
  grade_point: number;
  @IsInt()
  @Max(20)
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
  // @ApiProperty()
  // @ValidateNested()
  // job_result: JobResult;
  @IsInt()
  @ApiProperty()
  job_score: number;
  @IsInt()
  @ApiProperty()
  kuma_point: number;
  // @ApiProperty()
  // @ValidateNested()
  // my_result: PlayerResult;
  // @ApiProperty({ type: [PlayerResult] })
  // @ValidateNested({ each: true })
  // other_results: PlayerResult[];
  @Expose()
  @Transform((param) => new Date(param.value * 1000).toISOString())
  @IsDateString()
  @ApiProperty()
  play_time: string;
  @ApiProperty()
  @ValidateNested()
  @Type(() => PlayerType)
  player_time: PlayerType;
  @ApiProperty()
  @ValidateNested()
  @Type(() => Schedule)
  schedule: Schedule;
  @Expose()
  @Transform((param) => new Date(param.value * 1000).toISOString())
  @IsDateString()
  @ApiProperty()
  start_time: string;
  @ApiProperty({ type: [WaveResult] })
  @ValidateNested({ each: true })
  @Type(() => WaveResult)
  wave_details: WaveResult[];
}

export class Results {
  @ApiProperty({ type: [Result] })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => Result)
  results: Result[];
}
