import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtension,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiPaginatedResponse,
  PaginatedDto,
  PaginatedRequestDtoForResult,
} from 'src/dto/pagination.dto';
import { ResultsService } from './results.service';

@Controller('results')
@ApiExtraModels(PaginatedDto)
export class ResultsController {
  constructor(private readonly service: ResultsService) {}

  @Get(':salmon_id')
  @ApiParam({ name: 'salmon_id', type: 'integer', description: 'リザルトID' })
  @ApiTags('リザルト')
  @ApiOperation({ operationId: '取得' })
  find() {}

  @Get('')
  @ApiTags('リザルト')
  @ApiOperation({ operationId: '一括取得' })
  findAll(@Query() query: PaginatedRequestDtoForResult) {}

  @Get('schedules/:schedule_id')
  @ApiParam({ name: 'schedule_id', type: 'integer', description: 'シフトID' })
  @ApiTags('リザルト一覧')
  @ApiOperation({ operationId: 'スケジュール指定' })
  findAll_schedules(@Query() query: PaginatedRequestDtoForResult) {}

  @Get('users/:nsaid')
  @ApiParam({ name: 'nsaid', type: 'string', description: 'プレイヤーID' })
  @ApiTags('リザルト一覧')
  @ApiOperation({ operationId: 'プレイヤー指定' })
  findAll_users(@Query() query: PaginatedRequestDtoForResult) {}

  @Post('')
  @ApiTags('リザルト')
  @ApiOperation({ operationId: '登録' })
  create() {}

  @Put(':salmon_id')
  @ApiParam({ name: 'salmon_id', type: 'integer', description: 'リザルトID' })
  @ApiTags('リザルト')
  @ApiOperation({ operationId: '更新' })
  update() {}

  @Delete(':salmon_id')
  @ApiParam({ name: 'salmon_id', type: 'integer', description: 'リザルトID' })
  @ApiTags('リザルト')
  @ApiOperation({ operationId: '削除' })
  delete() {}
}
