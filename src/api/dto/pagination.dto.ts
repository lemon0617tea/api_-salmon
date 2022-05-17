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

export class PaginatedRequestDto {
  @Expose()
  @Transform((params) => parseInt(params.value, 10))
  @ApiProperty({
    title: 'offset',
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
  @ApiPropertyOptional({
    title: '',
    default: false,
    description: 'クリアしたリザルトのみ',
  })
  readonly is_clear?: boolean;

  @ApiPropertyOptional()
  readonly nsaid?: string;
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
