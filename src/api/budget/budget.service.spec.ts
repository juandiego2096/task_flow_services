import { Test, TestingModule } from '@nestjs/testing';
import { BudgetService } from './budget.service';
import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/sequelize';
import { BudgetEntity } from '../../entities/budget.entity';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        BudgetService,
        {
          provide: getModelToken(BudgetEntity),
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

    service = module.get<BudgetService>(BudgetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
