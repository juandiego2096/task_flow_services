import { Test, TestingModule } from '@nestjs/testing';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/sequelize';
import { ServiceEntity } from '../../entities/service.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../../entities/user.entity';

describe('ServiceController', () => {
  let controller: ServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [ServiceController],
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

    controller = module.get<ServiceController>(ServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
