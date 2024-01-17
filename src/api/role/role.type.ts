import { ApiProperty } from '@nestjs/swagger';

export class createRoleDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
