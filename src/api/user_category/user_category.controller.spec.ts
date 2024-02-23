import { Test, TestingModule } from '@nestjs/testing';
import { UserCategoryController } from './user_category.controller';
import { UserCategoryService } from './user_category.service';
import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/sequelize';
import { UserCategoryEntity } from '../../entities/user_category.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../../entities/user.entity';

describe('UserCategoryController', () => {
  let controller: UserCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [UserCategoryController],
      providers: [
        UserCategoryService,
        {
          provide: getModelToken(UserCategoryEntity),
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            destroy: jest.fn(),
          },
        },
        UserService,
        {
          provide: getModelToken(UserEntity),
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            destroy: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserCategoryController>(UserCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
