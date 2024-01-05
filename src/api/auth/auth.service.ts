import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/entities/user.entity';
import { UserDto } from '../user/user.type';
import { AuthResponse, AuthTokenResult, PayloadToken } from './auth.type';
import { decode } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<UserEntity | null> {
    const userByUsername = await this.userService.getUserByUsername(username);

    if (userByUsername == null || userByUsername == undefined) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (userByUsername) {
      const match = await bcrypt.compare(password, userByUsername.password);
      if (match) return userByUsername;
    }

    return null;
  }

  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }): string {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: UserDto): Promise<AuthResponse> {
    const getUser: UserDto | null = await this.userService.getUserById(user.id);

    if (getUser === null || getUser === undefined) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    let payload: PayloadToken | null = null;

    if (getUser) {
      payload = {
        role: getUser.id_role,
        user: getUser.id,
      };
    }

    return {
      accessToken: this.signJWT({
        payload,
        secret: this.configService.get<string>('JWT_SECRET', ''),
        expires: this.configService.get<string>('JWT_EXPIRATION', '1h'),
      }),
    };
  }

  public async getUserFromAuthToken(authToken: string) {
    const decodedAuthToken = decode(authToken) as AuthTokenResult;
    if (!decodedAuthToken || typeof decodedAuthToken === 'string') {
      console.log('Cannot decode jwt token');
      return null;
    }

    const findUser = await this.userService.getUserById(decodedAuthToken.user);
    if (findUser === null || findUser === undefined) {
      console.log('Invalid user');
      return null;
    }

    return {
      userId: findUser.id,
      userRole: findUser.id,
    };
  }
}
