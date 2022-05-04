import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import {
  ScheduleRequest,
  ScheduleRequestBody,
} from 'src/dto/request/schedules.request';
import { Schedule } from 'src/dto/schedule.response';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly service: SchedulesService) {}

  @Get(':schedule_id')
  @ApiParam({ name: 'schedule_id', type: 'integer', description: 'シフトID' })
  @ApiTags('スケジュール')
  @ApiOperation({ operationId: '統計取得' })
  @ApiOkResponse({ type: Schedule.Stats })
  find() {}

  @Post()
  @ApiTags('スケジュール')
  @ApiOperation({ operationId: '追加' })
  create() {
    this.service.create();
  }
}
