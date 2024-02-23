import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { ConfigModule } from '@nestjs/config';
import { RoleEntity } from '../../entities/role.entity';
import { getModelToken } from '@nestjs/sequelize';

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        RoleService,
        {
          provide: getModelToken(RoleEntity),
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

    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
