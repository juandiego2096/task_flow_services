import { ApiProperty } from '@nestjs/swagger';

export class createUserDto {
  @ApiProperty()
  id_role: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class UserDto {
  id: string;
  id_role: string;
  name: string;
  username: string;
  password: string;
}
