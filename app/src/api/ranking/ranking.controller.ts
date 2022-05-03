import { Controller, Delete, Get, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Waves } from 'src/dto/wave.response';

@Controller('ranking')
export class RankingController {
  @Get('schedules/:schedule_id')
  @ApiParam({ name: 'schedule_id', type: 'integer', description: 'シフトID' })
  @ApiTags('ランキング')
  @ApiOperation({ operationId: '取得' })
  @ApiResponse({ status: HttpStatus.OK, type: Waves })
  findAll() {}
}
