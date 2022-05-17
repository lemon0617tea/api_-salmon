import { Prisma, Result as ResultModel } from '.prisma/client';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  PaginatedDto,
  PaginatedRequestDto,
  PaginatedRequestDtoForResult,
} from '../dto/pagination.dto';
import { Results as UploadedResultsModel } from '../dto/result.request.dto';
import { ResultsService } from './results.service';
import { UploadResult, UploadResults } from './results.status';

@Controller('results')
@ApiExtraModels(PaginatedDto)
export class ResultsController {
  constructor(private readonly service: ResultsService) {}

  @Get(':salmon_id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiParam({ name: 'salmon_id', type: 'integer', description: 'リザルトID' })
  @ApiTags('リザルト')
  @ApiOperation({ operationId: '取得' })
  @ApiNotFoundResponse()
  find(
    @Param('salmon_id', ParseIntPipe) salmonId: number
  ): Promise<Partial<ResultModel>> {
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
    @Query() query: PaginatedRequestDtoForResult
  ): Promise<ResultModel[]> {
    return;
  }

  @Get('users/:nsaid')
  @ApiTags('リザルト一覧')
  @ApiOperation({ operationId: 'プレイヤー指定' })
  @ApiNotFoundResponse()
  findManyByUser(
    @Param('nsaid') nsaid: string,
    @Query() query: PaginatedRequestDto
  ): Promise<ResultModel[]> {
    return this.service.findMany(query);
  }

  @Post('')
  @ApiTags('リザルト')
  @ApiOperation({ operationId: '登録' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  // @ApiBody({ type: UploadedResultsModel })
  create(
    @Body(new ValidationPipe({ transform: true }))
    request: UploadedResultsModel
  ): Promise<UploadResults> {
    return this.service.create(request);
  }

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
