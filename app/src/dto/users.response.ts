import { ApiProperty } from '@nestjs/swagger';

export namespace Users {
  interface MetadataType {
    id: number;
    nsaid: string;
    username: string;
    thumbnail_url: string;
  }
  export class Metadata implements MetadataType {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nsaid: string;
    @ApiProperty()
    username: string;
    @ApiProperty()
    thumbnail_url: string;
  }
}
