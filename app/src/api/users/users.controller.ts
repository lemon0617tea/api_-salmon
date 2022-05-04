import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma, SplatNet2, Users } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';
import { IsIn, IsInt, IsString, Length } from 'class-validator';
import { PaginatedDto } from 'src/dto/response.interface';
import { User } from 'src/dto/users.response';
import { UsersService } from './users.service';

class FindRequest {
  @Length(16, 16)
  nsaid: string;
}

@Controller('users')
@ApiExtraModels(PaginatedDto)
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('')
  @ApiTags('ユーザー')
  @ApiOperation({ operationId: '作成' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiQuery({ name: 'uid', type: 'string' })
  createUser(@Query() data: Prisma.UsersCreateInput): Promise<Users> {
    return this.service.createUser(data);
  }

  @Get(':nsaid')
  @ApiParam({ name: 'nsaid', type: 'string', description: 'アカウントID' })
  @ApiTags('ユーザー')
  @ApiOperation({ operationId: '取得' })
  @ApiOkResponse({ type: User.Metadata })
  find(@Param() request: FindRequest): Promise<SplatNet2> {
    return this.service.find({ nsaid: request.nsaid });
  }

  @Get('')
  @ApiTags('ユーザー')
  @ApiOperation({ operationId: '一覧取得' })
  @ApiOkResponse({ type: User.Metadata })
  findAll(): Promise<Users[]> {
    return this.service.findAll();
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
  @ApiOkResponse({ type: User.Metadata })
  update() {}

  @Delete(':nsaid')
  @ApiParam({ name: 'nsaid', type: 'string', description: 'ユーザーID' })
  @ApiTags('ユーザー')
  @ApiOperation({ operationId: '削除' })
  @ApiOkResponse({ type: User.Metadata })
  delete() {}
}
