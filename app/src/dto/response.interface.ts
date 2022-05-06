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

export class PaginatedDto<T> {
  @ApiProperty({ type: 'integer', description: '総数' })
  total: number;
  @ApiProperty({ type: 'integer', description: '取得数' })
  limit: number;
  @ApiProperty({ type: 'integer', description: 'オフセット' })
  offset: number;
  @ValidateNested({ each: true })
  @ApiProperty()
  results: T[];
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
