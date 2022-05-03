import { ApiProperty } from '@nestjs/swagger';

export namespace Users {
  export interface Metadata {
    id: number;
    nsaid: string;
    username: string;
    thumbnail_url: string;
  }

  export class Response implements Metadata {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nsaid: string;
    @ApiProperty()
    username: string;
    @ApiProperty({ type: 'url' })
    thumbnail_url: string;
  }
}
