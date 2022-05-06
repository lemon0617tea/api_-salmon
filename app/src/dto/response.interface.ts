import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';

export class ErrorResponse {
  @ApiProperty()
  error: string;
  @ApiProperty()
  error_description: string;
}
