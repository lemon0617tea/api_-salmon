import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventType, Species, Style, WaterLevel } from '@prisma/client';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { ResourceLimits } from 'worker_threads';
import { Results } from '../results.response';

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

class BossKey {
  @ApiProperty({ enum: BossType })
  @IsEnum(BossType)
  key: BossType;
  @ApiPropertyOptional()
  @IsString()
  name: string;
}

class BossCount {
  @ApiProperty()
  @ValidateNested()
  boss: BossKey;
  @ApiProperty({ type: 'integer' })
  @IsInt()
  @Min(0)
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

class WaterLevelRequest {
  @ApiProperty({ enum: WaterLevel })
  @IsEnum(WaterLevel)
  key: WaterLevel;
  @ApiPropertyOptional()
  @IsString()
  name: string;
}

class EventTypeRequest {
  @ApiProperty({ enum: EventType })
  @IsEnum(EventType)
  key: EventType;
  @ApiPropertyOptional()
  @IsString()
  name: string;
}

class WaveRequest {
  @ApiProperty()
  @ValidateNested()
  event_type: EventTypeRequest;
  @ApiProperty({ type: 'integer' })
  @IsInt()
  @Min(0)
  golden_ikura_num: number;
  @ApiProperty({ type: 'integer' })
  @IsInt()
  @Min(0)
  golden_ikura_pop_num: number;
  @ApiProperty({ type: 'integer' })
  @IsInt()
  @Min(0)
  ikura_num: number;
  @ApiProperty({ type: 'integer' })
  @IsInt()
  @Min(25)
  @Min(0)
  quota_num: number;
  @ApiProperty()
  @ValidateNested()
  water_level: WaterLevelRequest;
}

class GradeRequest {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiPropertyOptional()
  @IsString()
  long_name: string;
  @ApiPropertyOptional()
  @IsString()
  name: string;
  @ApiPropertyOptional()
  @IsString()
  short_name: string;
}

class StageRequest {}

class Weapon {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsString()
  image: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  thumbnail: string;
}

class WeaponRequest {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  @ValidateNested()
  weapon: Weapon;
}

class ScheduleRequest {
  //   end_time: number;
  //   stage: StageRequest;
  //   start_time: number;
  //   weapons: WeaponRequest[];
}

class PlayerTypeRequest {
  @ApiProperty({ enum: Species })
  @IsEnum(Species)
  species: Species;
  @ApiProperty({ enum: Style })
  @IsEnum(Style)
  style: Style;
}

class SpecialRequest {
  @IsString()
  id: string;
  @IsString()
  image_a: string;
  @IsString()
  image_b: string;
  @IsString()
  name: string;
}

class PlayerRequest {
  @ApiProperty()
  @ValidateNested()
  boss_kill_counts: BossCounts;
  @ApiProperty({ type: 'integer' })
  @IsInt()
  @Min(0)
  dead_count: number;
  @ApiProperty({ type: 'integer' })
  @IsInt()
  @Min(0)
  golden_ikura_num: number;
  @ApiProperty({ type: 'integer' })
  @IsInt()
  @Min(0)
  help_count: number;
  @ApiProperty({ type: 'integer' })
  @IsInt()
  @Min(0)
  ikura_num: number;
  @IsString()
  name: string;
  @IsString()
  @Length(16, 16)
  pid: string;
  @ValidateNested()
  player_type: PlayerTypeRequest;
  @ValidateNested()
  special: SpecialRequest;
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  special_counts: number[];
  @IsArray()
  @ValidateNested({ each: true })
  weapon_list: WeaponRequest[];
}

export class ResultRequest {
  @ApiProperty()
  @ValidateNested()
  boss_counts: BossCounts;
  @ApiProperty()
  @ValidateNested()
  grade: GradeRequest;
  @ApiProperty({ type: 'double' })
  @IsNumber()
  @Max(200)
  @Min(0)
  danger_rate: number;
  @ApiProperty({ type: 'integer' })
  @IsInt()
  end_time: number;
  @ApiPropertyOptional({ type: 'integer' })
  @IsInt()
  @Max(999)
  @Min(0)
  grade_point: number;
  @ApiPropertyOptional({ type: 'integer' })
  @IsInt()
  @Max(20)
  @Min(-20)
  grade_point_delta: number;
  @ApiPropertyOptional({ type: 'integer' })
  @IsInt()
  @Min(0)
  job_id: number;
  @ApiPropertyOptional({ type: 'integer' })
  @IsInt()
  @Max(435)
  @Min(0)
  job_rate: number;
  @ValidateNested()
  job_result: Results.JobResult;
  @ApiPropertyOptional({ type: 'integer' })
  @IsInt()
  @Min(0)
  job_score: number;
  @ApiPropertyOptional({ type: 'integer' })
  @IsInt()
  @Min(0)
  kuma_point: number;
  @ValidateNested()
  my_result: PlayerRequest;
  @ValidateNested({ each: true })
  other_results: PlayerRequest[];
  @ApiProperty({ type: 'integer' })
  @IsInt()
  play_time: number;
  @ValidateNested()
  player_type: PlayerTypeRequest;
  @ApiProperty({ type: 'integer' })
  @IsInt()
  start_time: number;
  @ApiProperty({ type: [WaveRequest] })
  @ValidateNested({ each: true })
  wave_details: WaveRequest[];
}

export class ResultRequestBody {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @ApiProperty({
    title: 'SplatNet2',
    minItems: 0,
    maxItems: 50,
    type: [ResultRequest],
  })
  readonly results: ResultRequest[];
}
