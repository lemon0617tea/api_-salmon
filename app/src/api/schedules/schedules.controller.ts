import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { PaginatedRequestDto } from 'src/dto/pagination.dto';
import {
  ScheduleFilterDto,
  ScheduleRequest,
  ScheduleRequestBody,
} from 'src/dto/request/schedules.request';
import { ApiPaginatedResponse } from 'src/dto/response.interface';
import { PaginatedResponseDto, Schedule } from 'src/dto/schedule.response';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly service: SchedulesService) {}

  @Get(':schedule_id/stats')
  @ApiParam({ name: 'schedule_id', type: 'integer', description: 'シフトID' })
  @ApiTags('スケジュール')
  @ApiOperation({ operationId: '統計取得' })
  @ApiOkResponse({ type: Schedule.Stats })
  find_stats() {}

  @Get('')
  @ApiTags('スケジュール')
  @ApiOperation({ operationId: '取得' })
  @ApiPaginatedResponse(Schedule.ScheduleMetadata)
  findMany(
    @Query() request: ScheduleFilterDto,
  ): Promise<PaginatedResponseDto<Schedule.ScheduleMetadata>> {
    return this.service.findMany(request);
  }

  @Post()
  @ApiTags('スケジュール')
  @ApiOperation({ operationId: '追加' })
  create() {
    this.service.create();
  }
}
