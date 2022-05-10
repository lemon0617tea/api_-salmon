import { User as UserModel } from '.prisma/client';
import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedRequestDto } from 'src/dto/pagination.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('')
  @ApiTags('ユーザー')
  @ApiOperation({
    operationId: '一覧取得',
    description: '登録順にユーザ情報を取得します',
  })
  @ApiOkResponse()
  findMany(@Query() request: PaginatedRequestDto): Promise<UserModel[]> {
    return this.service.findMany(request.offset, request.limit);
  }

  @Post('')
  @ApiTags('ユーザー')
  @ApiOperation({ operationId: '作成' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiQuery({ name: 'uid', type: 'string' })
  create() {}

  @Get(':nsaid')
  @ApiTags('ユーザー')
  @ApiOperation({
    operationId: '取得',
    description: '指定されたIDのユーザを取得します',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  find(@Param('nsaid', ParseIntPipe) nsaid: number): Promise<UserModel> {
    return this.service.find(nsaid);
  }

  // @Post('')
  // @ApiTags('アカウント')
  // @ApiOperation({ operationId: '作成' })
  // @ApiOkResponse({ type: User.Metadata })
  // async create(@Param() request: CreateUserRequest): Promise<SplatNet2> {
  //   return;
  // }

  @Put(':nsaid')
  @ApiParam({ name: 'nsaid', type: 'string', description: 'ユーザーID' })
  @ApiTags('ユーザー')
  @ApiOperation({ operationId: '更新' })
  update() {}

  @Delete(':nsaid')
  @ApiParam({ name: 'nsaid', type: 'string', description: 'ユーザーID' })
  @ApiTags('ユーザー')
  @ApiOperation({ operationId: '削除' })
  delete() {}
}
