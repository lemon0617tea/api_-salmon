import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class WaveResultDTO {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => WaveDTO)
  @ArrayMinSize(1)
  @ArrayMaxSize(150)
  results: WaveDTO[];
}

export class WaveDTO {
  @IsNotEmpty()
  start_time: number;

  @IsNotEmpty()
  play_time: number;

  @IsNotEmpty()
  @Min(0)
  @Max(2)
  wave_num: number;

  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  members: string[];

  @IsNotEmpty()
  @Min(0)
  @Max(5000)
  ikura_num: number;

  @IsNotEmpty()
  @Min(0)
  @Max(150)
  golden_ikura_num: number;

  @IsNotEmpty()
  @Min(0)
  @Max(150)
  golden_ikura_pop_num: number;

  @IsNotEmpty()
  @Min(0)
  @Max(25)
  quota_num: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(6)
  event_type: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(2)
  water_level: number;

  @IsNotEmpty()
  is_clear: boolean;
}
