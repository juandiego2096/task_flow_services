import { ApiProperty } from '@nestjs/swagger';

export class createAgentDto {
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
}
