import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { UserCategoryService } from './user_category.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCategoryEntity } from '../../entities/user_category.entity';
import { createUserCategoryDto } from './user_category.type';

@UseGuards(AuthGuard)
@Controller('user_categories')
@ApiTags('UserCategory')
export class UserCategoryController {
  constructor(private readonly userCategoryService: UserCategoryService) {}

  @Post('createUserCategory')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: UserCategoryEntity,
  })
  async createUserCategory(@Body() newUserCategory: createUserCategoryDto): Promise<UserCategoryEntity | HttpException> {
    const userCategoryByName = await this.userCategoryService.getUserCategoryByName(newUserCategory.name);

    if (userCategoryByName) {
      throw new HttpException(`Already exists a user category created with name ${newUserCategory.name}`, HttpStatus.FOUND);
    }

    return await this.userCategoryService.createUserCategory(newUserCategory);
  }

  @Get('getUserCategories')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: UserCategoryEntity,
  })
  async getUserCategories(): Promise<UserCategoryEntity[]> {
    return await this.userCategoryService.getUserCategories();
  }

  @Get('getUserCategoryById/:userCategoryId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: UserCategoryEntity,
  })
  async getUserCategoryById(@Param('userCategoryId') userCategoryId: number): Promise<UserCategoryEntity | HttpException> {
    const userCategoryFound = await this.userCategoryService.getUserCategoryById(userCategoryId);

    if (!userCategoryFound) {
      throw new HttpException('User category not found', HttpStatus.NOT_FOUND);
    }

    return userCategoryFound;
  }

  @Patch('updateUserCategory/:userCategoryId')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
    type: UserCategoryEntity,
  })
  async updateUserCategory(@Request() req, @Param('userCategoryId') userCategoryId: number, @Body() updateUserCategory: createUserCategoryDto) {
    /*     if (req.userRole !== (ROLES.SUPER_ADMIN && ROLES.ADMIN)) {
      throw new HttpException(
        'User not enabled to create a specie',
        HttpStatus.UNAUTHORIZED,
      );
    } */

    const userCategory = await this.userCategoryService.getUserCategoryById(userCategoryId);
    if (!userCategory) {
      throw new HttpException(`User category with id  ${userCategoryId} not found`, HttpStatus.NOT_FOUND);
    }

    userCategory.name = updateUserCategory.name;
    userCategory.description = updateUserCategory.description;

    await this.userCategoryService.updateUserCategory(userCategory);
  }
}
