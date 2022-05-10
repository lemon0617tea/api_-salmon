import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import {
  ApiPaginatedResponse,
  PaginatedRequestDto,
} from 'src/dto/pagination.dto';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly service: SchedulesService) {}

  @Get(':schedule_id/stats')
  @ApiParam({ name: 'schedule_id', type: 'integer', description: 'シフトID' })
  @ApiTags('スケジュール')
  @ApiOperation({ operationId: '統計取得' })
  find_stats() {}

  @Get('')
  @ApiTags('スケジュール')
  @ApiOperation({ operationId: '取得' })
  findMany() {}

  @Post()
  @ApiTags('スケジュール')
  @ApiOperation({ operationId: '追加' })
  create() {
    this.service.create();
  }
}
