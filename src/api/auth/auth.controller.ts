import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse, loginDto } from './auth.type';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginParams: loginDto): Promise<AuthResponse> {
    const userValidate = await this.authService.validateUser(loginParams.username, loginParams.password);

    if (!userValidate) {
      throw new HttpException('Data not valid', HttpStatus.BAD_REQUEST);
    }

    const jwt = await this.authService.generateJWT(userValidate);

    return jwt;
  }
}
