import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCategoryEntity } from 'src/entities/user_category.entity';
import { Repository } from 'typeorm';
import { createUserCategoryDto } from './user_category.type';

@Injectable()
export class UserCategoryService {
  constructor(
    @InjectRepository(UserCategoryEntity)
    private readonly userCategoryRepository: Repository<UserCategoryEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createUserCategory(userCategory: createUserCategoryDto): Promise<UserCategoryEntity> {
    return this.userCategoryRepository.save({
      name: userCategory.name,
      description: userCategory.description,
    });
  }

  async getUserCategories(): Promise<UserCategoryEntity[]> {
    return this.userCategoryRepository.find();
  }

  async getUserCategoryById(userCategoryId: number): Promise<UserCategoryEntity | null> {
    return await this.userCategoryRepository.findOne({
      where: { id: userCategoryId },
    });
  }

  async getUserCategoryByName(userCategoryName: string): Promise<UserCategoryEntity | null> {
    return await this.userCategoryRepository.findOne({
      where: { name: userCategoryName },
    });
  }

  async updateUserCategory(userCategory: UserCategoryEntity) {
    return this.userCategoryRepository.save(userCategory);
  }
}
