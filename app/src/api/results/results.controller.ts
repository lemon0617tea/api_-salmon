import { Prisma, Result as ResultModel } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiPaginatedResponse,
  PaginatedDto,
  PaginatedRequestDto,
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
  @ApiNotFoundResponse()
  find(
    @Param('salmon_id', ParseIntPipe) salmonId: number,
  ): Promise<ResultModel> {
    return this.service.find(salmonId);
  }

  @Get('')
  @ApiTags('リザルト')
  @ApiOperation({ operationId: '一括取得' })
  findMany(@Query() query: PaginatedRequestDtoForResult): Promise<ResultModel> {
    return;
  }

  @Get('schedules/:schedule_id')
  @ApiParam({ name: 'schedule_id', type: 'integer', description: 'シフトID' })
  @ApiTags('リザルト一覧')
  @ApiOperation({ operationId: 'スケジュール指定' })
  @ApiNotFoundResponse()
  findManyByScheduleId(
    @Query() query: PaginatedRequestDtoForResult,
  ): Promise<ResultModel[]> {
    return;
  }

  @Get('users/:nsaid')
  @ApiTags('リザルト一覧')
  @ApiOperation({ operationId: 'プレイヤー指定' })
  @ApiNotFoundResponse()
  findManyByUser(
    @Param('nsaid') nsaid: string,
    @Query() query: PaginatedRequestDto,
  ): Promise<ResultModel[]> {
    return this.service.findMany(query);
  }

  @Post('')
  @ApiTags('リザルト')
  @ApiOperation({ operationId: '登録' })
  create() {}

  @Put(':salmon_id')
  @ApiParam({ name: 'salmon_id', type: 'integer', description: 'リザルトID' })
  @ApiTags('リザルト')
  @ApiOperation({ operationId: '更新' })
  @ApiNotFoundResponse()
  update() {}

  @Delete(':salmon_id')
  @ApiParam({ name: 'salmon_id', type: 'integer', description: 'リザルトID' })
  @ApiTags('リザルト')
  @ApiOperation({ operationId: '削除' })
  @ApiNotFoundResponse()
  delete() {}
}
