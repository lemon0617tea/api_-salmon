import { EventType, Species, Style, WaterLevel } from '@prisma/client';
import {
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
  @IsEnum(BossType)
  key: BossType;
  @IsString()
  name: string;
}

class BossCount {
  @ValidateNested()
  boss: BossKey;
  @IsInt()
  @Min(0)
  count: number;
}

class BossCounts {
  @ValidateNested()
  '3': BossCount;
  @ValidateNested()
  '6': BossCount;
  @ValidateNested()
  '9': BossCount;
  @ValidateNested()
  '12': BossCount;
  @ValidateNested()
  '13': BossCount;
  @ValidateNested()
  '14': BossCount;
  @ValidateNested()
  '15': BossCount;
  @ValidateNested()
  '16': BossCount;
  @ValidateNested()
  '21': BossCount;
}

class WaterLevelRequest {
  @IsEnum(WaterLevel)
  key: WaterLevel;
  @IsString()
  name: string;
}

class EventTypeRequest {
  @IsEnum(EventType)
  key: EventType;
  @IsString()
  name: string;
}

class WaveRequest {
  @ValidateNested()
  event_type: EventTypeRequest;
  @IsInt()
  @Min(0)
  golden_ikura_num: number;
  @IsInt()
  @Min(0)
  golden_ikura_pop_num: number;
  @IsInt()
  @Min(0)
  ikura_num: number;
  @IsInt()
  @Min(25)
  @Min(0)
  quota_num: number;
  @ValidateNested()
  water_level: WaterLevelRequest;
}

class GradeRequest {
  @IsString()
  id: string;
  @IsString()
  long_name: string;
  @IsString()
  name: string;
  @IsString()
  short_name: string;
}

class StageRequest {}

class Weapon {
  @IsString()
  id: string;
  @IsString()
  image: string;
  @IsString()
  name: string;
  @IsString()
  thumbnail: string;
}

class WeaponRequest {
  @IsString()
  id: string;
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
  @IsEnum(Species)
  species: Species;
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
  @ValidateNested()
  boss_kill_counts: BossCounts;
  @IsInt()
  @Min(0)
  dead_count: number;
  @IsInt()
  @Min(0)
  golden_ikura_num: number;
  @IsInt()
  @Min(0)
  help_count: number;
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
  @IsArray()
  @ValidateNested({ each: true })
  special_counts: number[];
  @IsArray()
  @ValidateNested({ each: true })
  weapon_list: WeaponRequest[];
}

export class ResultRequest {
  @ValidateNested()
  boss_counts: BossCounts;
  @ValidateNested()
  grade: GradeRequest;
  @IsNumber()
  @Max(200)
  @Min(0)
  danger_rate: number;
  @IsInt()
  end_time: number;
  @IsInt()
  @Max(999)
  @Min(0)
  grade_point: number;
  @IsInt()
  @Max(20)
  @Min(-20)
  grade_point_delta: number;
  @IsInt()
  @Min(0)
  job_id: number;
  @IsInt()
  @Max(435)
  @Min(0)
  job_rate: number;
  @ValidateNested()
  job_result: Results.JobResult;
  @IsInt()
  @Min(0)
  job_score: number;
  @IsInt()
  @Min(0)
  kuma_point: number;
  @ValidateNested()
  my_result: PlayerRequest;
  @ValidateNested({ each: true })
  other_results: PlayerRequest[];
  @IsInt()
  play_time: number;
  @ValidateNested()
  player_type: PlayerTypeRequest;
  @IsInt()
  start_time: number;
  @ValidateNested({ each: true })
  wave_details: WaveRequest[];
}
