import { Module } from '@nestjs/common';
import { UserCategoryService } from './user_category.service';
import { UserCategoryController } from './user_category.controller';
import { UserCategoryEntity } from 'src/entities/user_category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserCategoryEntity])],
  controllers: [UserCategoryController],
  providers: [UserCategoryService],
})
export class UserCategoryModule {}
