import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

class BossKey<T> {
  @ApiProperty({ enum: BossType })
  @IsEnum(BossType)
  key: BossType;
  @ApiPropertyOptional()
  @IsString()
  name: string;
}

class BossCount<T> {
  @ApiProperty()
  @ValidateNested()
  boss: BossKey<T>;
  @ApiProperty({ type: 'integer' })
  @IsInt()
  @Min(0)
  count: number;
}

class BossCounts {
  @ApiProperty()
  @ValidateNested()
  '3': BossCount<BossType.GOLDEN>;
  @ApiProperty()
  @ValidateNested()
  '6': BossCount<BossType.BOMBER>;
  @ApiProperty()
  @ValidateNested()
  '9': BossCount<BossType.TWINS>;
  @ApiProperty()
  @ValidateNested()
  '12': BossCount<BossType.SHIELD>;
  @ApiProperty()
  @ValidateNested()
  '13': BossCount<BossType.SNAKE>;
  @ApiProperty()
  @ValidateNested()
  '14': BossCount<BossType.TOWER>;
  @ApiProperty()
  @ValidateNested()
  '15': BossCount<BossType.DIVER>;
  @ApiProperty()
  @ValidateNested()
  '16': BossCount<BossType.DOZER>;
  @ApiProperty()
  @ValidateNested()
  '21': BossCount<BossType.ROCKET>;
}

export enum WaterLevel {
  LOW = 'low',
  MIDDLE = 'normal',
  HIGH = 'high',
}

export enum EventType {
  WATERLEVELS = 'water-levels',
  RUSH = 'rush',
  GEYSER = 'goldie-seeking',
  GRILLER = 'griller',
  RALLY = 'the-mothership',
  FOG = 'fog',
  MISSILE = 'cohock-charge',
}

class WaterLevelRequest {
  @ApiProperty({ enum: WaterLevel, example: WaterLevel.MIDDLE })
  @IsEnum(WaterLevel)
  key: WaterLevel;
  @ApiPropertyOptional()
  @IsString()
  name: string;
}

class EventTypeRequest {
  @ApiProperty({ enum: EventType, example: EventType.WATERLEVELS })
  @IsEnum(EventType)
  key: EventType;
  @ApiPropertyOptional()
  @IsString()
  name: string;
}

export class WaveRequest {
  @ApiProperty()
  @ValidateNested()
  event_type: EventTypeRequest;
  @ApiProperty({ type: 'integer' })
  @IsInt()
  @Min(0)
  golden_ikura_num: number;
  @ApiProperty({ type: 'integer', example: 100 })
  @IsInt()
  @Min(0)
  golden_ikura_pop_num: number;
  @ApiProperty({ type: 'integer', example: 2000 })
  @IsInt()
  @Min(0)
  ikura_num: number;
  @ApiProperty({ type: 'integer', example: 25 })
  @IsInt()
  @Min(25)
  @Min(0)
  quota_num: number;
  @IsArray()
  @ApiProperty()
  @ValidateNested()
  water_level: WaterLevelRequest;
}

class GradeRequest {
  @ApiProperty({ example: '5' })
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
  @ApiProperty({ example: '20000' })
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
  @ApiProperty({ example: '20000' })
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

enum Species {
  INKLING = 'inkling',
  OCTOLING = 'octoling',
}

enum Style {
  GIRL = 'girl',
  BOY = 'boy',
}

class PlayerTypeRequest {
  @ApiProperty({ enum: Species, example: Species.INKLING })
  @IsEnum(Species)
  species: Species;
  @ApiProperty({ enum: Style, example: Style.GIRL })
  @IsEnum(Style)
  style: Style;
}

class SpecialRequest {
  @ApiProperty({ example: '2' })
  @IsString()
  id: string;
  @ApiProperty()
  @IsString()
  image_a: string;
  @ApiProperty()
  @IsString()
  image_b: string;
  @ApiProperty()
  @IsString()
  name: string;
}

export class PlayerRequest {
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
  @ApiProperty({ example: 'tkgstrator' })
  @IsString()
  name: string;
  @ApiProperty({ example: 'ffffffffffffffff' })
  @IsString()
  @Length(16, 16)
  pid: string;
  @ApiProperty()
  @ValidateNested()
  player_type: PlayerTypeRequest;
  @ValidateNested()
  special: SpecialRequest;
  @ApiProperty({ type: [Number] })
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
  @ApiProperty({ type: 'float', example: 200.0 })
  @IsNumber()
  @Max(200)
  @Min(0)
  danger_rate: number;
  @ApiProperty({ type: 'integer' })
  @IsInt()
  end_time: number;
  @ApiPropertyOptional({ type: 'integer', example: 999 })
  @IsInt()
  @Max(999)
  @Min(0)
  grade_point: number;
  @ApiPropertyOptional({ type: 'integer', example: 0 })
  @IsInt()
  @Max(20)
  @Min(-20)
  grade_point_delta: number;
  @ApiPropertyOptional({ type: 'integer', example: 0 })
  @IsInt()
  @Min(0)
  job_id: number;
  @ApiPropertyOptional({ type: 'integer', example: 435 })
  @IsInt()
  @Max(435)
  @Min(0)
  job_rate: number;
  @ValidateNested()
  job_result: Results.JobResult;
  @ApiPropertyOptional({ type: 'integer', example: 1000 })
  @IsInt()
  @Min(0)
  job_score: number;
  @ApiPropertyOptional({ type: 'integer', example: 1000 })
  @IsInt()
  @Min(0)
  kuma_point: number;
  @ApiProperty()
  @ValidateNested()
  my_result: PlayerRequest;
  @ApiProperty({ type: [PlayerRequest] })
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
