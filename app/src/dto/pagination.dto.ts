/**
 * pagination.dto.ts
 * @author SONODA Yudai
 * @date 2020-10-11
 */

import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginatedRequestDto {
  @Expose()
  @Transform((params) => parseInt(params.value, 10))
  @ApiProperty({
    title: '',
    minimum: 0,
    default: 0,
  })
  readonly offset: number = 0;

  @Expose()
  @Transform((params) => parseInt(params.value, 10))
  @ApiProperty({
    title: 'limit',
    minimum: 0,
    maximum: 200,
    default: 25,
  })
  readonly limit: number = 25;
}

export class PaginatedRequestDtoForResult extends PaginatedRequestDto {
  @Expose()
  @ApiProperty({
    title: '',
    default: false,
    description: 'クリアしたリザルトのみ',
  })
  readonly is_only_clear: Boolean = false;
}

export class PaginatedDto<T> {
  @ApiProperty({ type: 'integer', description: '総数' })
  total: number;
  @ApiProperty({ type: 'integer', description: '取得数' })
  limit: number;
  @ApiProperty({ type: 'integer', description: 'オフセット' })
  offset: number;
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
