import { User as UserModel } from '.prisma/client';
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { ParseOptionalUnsignedIntPipe } from '../validation/parse-optional-unsigned-int.pipe';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('')
  @ApiOkResponse()
  findMany(
    @Query('offset', ParseOptionalUnsignedIntPipe)
    skip: number,
    @Query('limit', ParseOptionalUnsignedIntPipe)
    take?: number,
  ): Promise<UserModel[]> {
    return this.service.findMany(skip, take);
  }

  @Get(':user_id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  find(@Param('nsaid') id: number): Promise<UserModel> {
    return this.service.find(id);
  }
}
