import { ApiProperty } from '@nestjs/swagger';

export class createPersonContactDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  observations: string;
}
