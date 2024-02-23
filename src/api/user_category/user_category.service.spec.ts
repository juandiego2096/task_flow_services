import { Test, TestingModule } from '@nestjs/testing';
import { UserCategoryService } from './user_category.service';
import { ConfigModule } from '@nestjs/config';
import { UserCategoryEntity } from '../../entities/user_category.entity';
import { getModelToken } from '@nestjs/sequelize';

describe('UserCategoryService', () => {
  let service: UserCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
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
      ],
    }).compile();

    service = module.get<UserCategoryService>(UserCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
