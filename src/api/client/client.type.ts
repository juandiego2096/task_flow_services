import { ApiProperty } from '@nestjs/swagger';

export class createClientDto {
  @ApiProperty()
  number: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cif: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  id_address: number;

  @ApiProperty()
  id_agent: number;

  @ApiProperty()
  observations: string;
}
