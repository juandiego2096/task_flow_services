import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../../entities/user.entity';
import { createUserDto } from './user.type';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createUser')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: UserEntity,
  })
  async createUser(@Body() newUser: createUserDto): Promise<UserEntity | HttpException> {
    const userFoundByUsername = await this.userService.getUserByUsername(newUser.username);

    if (userFoundByUsername) {
      throw new HttpException(`User with username ${newUser.username} already exists`, HttpStatus.FOUND);
    }

    return await this.userService.createUser(newUser);
  }

  @Get('getUsers')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: UserEntity,
  })
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.getUsers();
  }

  @Get('getUserById/:userId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: UserEntity,
  })
  async getUserById(@Param('userId') userId: number): Promise<UserEntity | HttpException> {
    const userFound = await this.userService.getUserById(userId);

    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  @Get('self')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: UserEntity,
  })
  async getUserSelf(@Request() req): Promise<UserEntity | HttpException> {
    const userFound = await this.userService.getUserById(req.userId);

    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  @Patch('updateUser/:userId')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
    type: UserEntity,
  })
  async updateUser(@Request() req, @Param('userId') userId: number, @Body() updateUser: createUserDto) {
    /*     if (req.userRole !== (ROLES.SUPER_ADMIN && ROLES.ADMIN)) {
      throw new HttpException(
        'User not enabled to create a specie',
        HttpStatus.UNAUTHORIZED,
      );
    } */

    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new HttpException(`User with id  ${userId} not found`, HttpStatus.NOT_FOUND);
    }

    user.id_role = updateUser.id_role;
    user.username = updateUser.username;
    user.name = updateUser.name;
    user.password = updateUser.password;

    await this.userService.updateUser(user);
  }
}
