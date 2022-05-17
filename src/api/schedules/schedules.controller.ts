import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly service: SchedulesService) {}

  @Get(':schedule_id/stats')
  @ApiParam({ name: 'schedule_id', type: 'integer', description: 'シフトID' })
  @ApiTags('スケジュール')
  @ApiOperation({ operationId: '統計取得' })
  @ApiNotFoundResponse()
  findStats() {}

  @Get('')
  @ApiTags('スケジュール')
  @ApiOperation({
    operationId: '取得',
    description: 'スケジュールを取得します',
  })
  findMany() {}

  @Post('')
  @ApiTags('スケジュール')
  @ApiOperation({ operationId: '追加' })
  create() {
    this.service.create();
  }
}
