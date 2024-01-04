import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities/user.entity';
import { createUserDto } from './user.type';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createUser')
  async createUser(
    @Body() newUser: createUserDto,
  ): Promise<UserEntity | HttpException> {
    const userFoundByUsername = await this.userService.getUserByUsername(
      newUser.username,
    );

    if (userFoundByUsername) {
      throw new HttpException(
        `User with username ${newUser.username} already exists`,
        HttpStatus.FOUND,
      );
    }

    return await this.userService.createUser(newUser);
  }

  @Get('getUsers')
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.getUsers();
  }

  @Get('getUserById/:userId')
  async getUserById(
    @Param('userId') userId: string,
  ): Promise<UserEntity | HttpException | null> {
    const userFound = await this.userService.getUserById(userId);

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  @Get('self')
  async getUserSelf(
    @Request() req,
  ): Promise<UserEntity | HttpException | null> {
    const userFound = await this.userService.getUserById(req.userId);

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  @Patch('updateUser/:userId')
  async updateUser(
    @Request() req,
    @Param('userId') userId: string,
    @Body() updateUser: createUserDto,
  ) {
    /*     if (req.userRole !== (ROLES.SUPER_ADMIN && ROLES.ADMIN)) {
      throw new HttpException(
        'User not enabled to create a specie',
        HttpStatus.UNAUTHORIZED,
      );
    } */

    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new HttpException(
        `User with id  ${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    user.id_role = updateUser.id_role;
    user.username = updateUser.username;
    user.name = updateUser.name;
    user.password = updateUser.password;

    await this.userService.updateUser(user);
  }
}
