import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedDto } from 'src/dto/response.interface';
import { Users } from 'src/dto/users.response';

@Controller('users')
@ApiExtraModels(PaginatedDto)
export class UsersController {
  @Get(':nsaid')
  @ApiParam({ name: 'nsaid', type: 'string', description: 'ユーザーID' })
  @ApiTags('ユーザー')
  @ApiOperation({ operationId: '取得' })
  @ApiOkResponse({ type: Users.Metadata })
  find() {}

  @Post('')
  @ApiParam({ name: 'nsaid', type: 'string', description: 'ユーザーID' })
  @ApiTags('ユーザー')
  @ApiOperation({ operationId: '取得' })
  @ApiOkResponse({ type: Users.Metadata })
  create() {}

  @Put(':nsaid')
  @ApiParam({ name: 'nsaid', type: 'string', description: 'ユーザーID' })
  @ApiTags('ユーザー')
  @ApiOperation({ operationId: '更新' })
  @ApiOkResponse({ type: Users.Metadata })
  update() {}

  @Delete(':nsaid')
  @ApiParam({ name: 'nsaid', type: 'string', description: 'ユーザーID' })
  @ApiTags('ユーザー')
  @ApiOperation({ operationId: '削除' })
  @ApiOkResponse({ type: Users.Metadata })
  delete() {}
}
