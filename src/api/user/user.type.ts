import { ApiProperty } from '@nestjs/swagger';

export class createUserDto {
  @ApiProperty()
  id_role: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class UserDto {
  id: number;
  id_role: number;
  name: string;
  username: string;
  password: string;
}
