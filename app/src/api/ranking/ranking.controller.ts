import { Controller, Delete, Get, HttpStatus, Post, Put } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('ranking')
export class RankingController {
  @Get('schedules/:schedule_id')
  @ApiParam({ name: 'schedule_id', type: 'integer', description: 'シフトID' })
  @ApiTags('ランキング')
  @ApiOperation({ operationId: '取得' })
  @ApiNotFoundResponse()
  findAll() {}
}
