import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class ScheduleRequest {
  @IsInt()
  @ApiProperty({ default: 0 })
  start_time: number;
  @IsInt()
  @ApiProperty({ default: 0 })
  end_time: number;
  @ApiProperty({ default: null })
  @IsOptional()
  @Max(20003)
  @Min(20000)
  rare_weapon: number;
  @IsInt()
  @Max(5005)
  @Min(5000)
  @ApiProperty({ default: 5000 })
  stage_id: number;
  @IsArray()
  @ArrayMaxSize(4)
  @ArrayMinSize(4)
  @ApiProperty({ type: [Number], default: [-2, -2, -2, -2] })
  weapon_lists: number[];
}

export class ScheduleRequestBody {
  @ValidateNested({ each: true })
  @ApiProperty({ type: [ScheduleRequest] })
  schedules: [ScheduleRequest];
}
