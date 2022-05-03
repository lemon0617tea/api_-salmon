import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Schedule } from 'src/dto/schedule.response';

@Controller('schedules')
export class SchedulesController {
  @Get(':schedule_id')
  @ApiParam({ name: 'schedule_id', type: 'integer', description: 'シフトID' })
  @ApiTags('スケジュール')
  @ApiOperation({ operationId: '統計取得' })
  @ApiOkResponse({ type: Schedule.Stats })
  find() {}
}
