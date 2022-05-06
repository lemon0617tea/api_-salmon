import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
import { PaginatedRequestDto } from '../pagination.dto';

export class ScheduleFilterDto extends PaginatedRequestDto {
  @ApiPropertyOptional({
    type: 'integer',
    minimum: 5000,
    maximum: 5005,
    description: 'ステージID',
    nullable: true,
    default: null,
  })
  stage_id: number;
  @ApiPropertyOptional({
    description: '支給レアブキ',
    nullable: true,
    default: null,
  })
  rare_weapon: number;
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(4)
  @ApiPropertyOptional({ type: [Number], maximum: 4, description: '支給ブキ' })
  supplied_weapon: number[];
  @ApiPropertyOptional({
    type: 'datetime',
    description: '開始時刻',
    nullable: true,
    default: null,
  })
  start_time: Date;
  @ApiPropertyOptional({
    type: 'datetime',
    description: '終了時刻',
    nullable: true,
    default: null,
  })
  end_time: Date;
}

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
