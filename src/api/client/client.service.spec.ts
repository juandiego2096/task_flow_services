import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { ConfigModule } from '@nestjs/config';
import { ClientEntity } from '../../entities/client.entity';
import { getModelToken } from '@nestjs/sequelize';

describe('ClientService', () => {
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        ClientService,
        {
          provide: getModelToken(ClientEntity),
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

    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
