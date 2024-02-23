import { Test, TestingModule } from '@nestjs/testing';
import { ServiceService } from './service.service';
import { ConfigModule } from '@nestjs/config';
import { ServiceEntity } from '../../entities/service.entity';
import { getModelToken } from '@nestjs/sequelize';

describe('ServiceService', () => {
  let service: ServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        ServiceService,
        {
          provide: getModelToken(ServiceEntity),
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

    service = module.get<ServiceService>(ServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
