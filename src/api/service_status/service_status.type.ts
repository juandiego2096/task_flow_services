import { ApiProperty } from '@nestjs/swagger';

export class createServiceStatusDto {
  @ApiProperty()
  name: string;
}
