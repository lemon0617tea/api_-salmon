import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import {
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
  ErrorResponse,
  PaginatedDto,
} from 'src/dto/response.interface';
import { Results } from 'src/dto/results.response';
import { ResultsService } from './results.service';

@Controller('results')
@ApiExtraModels(PaginatedDto)
export class ResultsController {
  constructor(private readonly service: ResultsService) {}

  @Get(':salmon_id')
  @ApiParam({ name: 'salmon_id', type: 'integer', description: 'リザルトID' })
  @ApiTags('リザルト')
  @ApiOperation({ operationId: '取得' })
  @ApiResponse({ status: HttpStatus.OK, type: Results.Response })
  @ApiNotFoundResponse({ type: ErrorResponse })
  find() {}

  @Get('schedules/:schedule_id')
  @ApiParam({ name: 'schedule_id', type: 'integer', description: 'シフトID' })
  @ApiTags('リザルト一覧')
  @ApiOperation({ operationId: 'スケジュール指定' })
  @ApiPaginatedResponse(Results.Response)
  findAll_schedules() {}

  @Get('users/:nsaid')
  @ApiParam({ name: 'nsaid', type: 'string', description: 'プレイヤーID' })
  @ApiTags('リザルト一覧')
  @ApiOperation({ operationId: 'プレイヤー指定' })
  @ApiPaginatedResponse(Results.Response)
  findAll_users() {}

  @Post('')
  @ApiTags('リザルト')
  @ApiOperation({ operationId: '登録' })
  create() {}

  @Put(':salmon_id')
  @ApiParam({ name: 'salmon_id', type: 'integer', description: 'リザルトID' })
  @ApiTags('リザルト')
  @ApiOperation({ operationId: '更新' })
  @ApiResponse({ status: HttpStatus.OK, type: Results.Response })
  @ApiNotFoundResponse({ type: ErrorResponse })
  update() {}

  @Delete(':salmon_id')
  @ApiParam({ name: 'salmon_id', type: 'integer', description: 'リザルトID' })
  @ApiTags('リザルト')
  @ApiOperation({ operationId: '削除' })
  @ApiResponse({ status: HttpStatus.OK, type: Results.Response })
  @ApiNotFoundResponse({ type: ErrorResponse })
  delete() {}
}