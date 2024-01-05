import { ApiProperty } from '@nestjs/swagger';

export interface PayloadToken {
  user: string;
  role: string;
}

export interface AuthBody {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface AuthTokenResult {
  role: string;
  user: string;
  iat: number;
  exp: number;
}

export interface IUseToken {
  role: string;
  user: string;
  isExpired: boolean;
}

export class loginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
