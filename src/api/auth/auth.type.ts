import { ApiProperty } from '@nestjs/swagger';

export interface PayloadToken {
  user: number;
  role: number;
}

export interface AuthBody {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface AuthTokenResult {
  role: number;
  user: number;
  iat: number;
  exp: number;
}

export interface IUseToken {
  role: number;
  user: number;
  isExpired: boolean;
}

export class loginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
