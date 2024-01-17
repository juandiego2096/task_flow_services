import { Test, TestingModule } from '@nestjs/testing';
import { UserCategoryService } from './user_category.service';

describe('UserCategoryService', () => {
  let service: UserCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCategoryService],
    }).compile();

    service = module.get<UserCategoryService>(UserCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
