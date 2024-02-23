import { Test, TestingModule } from '@nestjs/testing';
import { PersonContactService } from './person_contact.service';
import { ConfigModule } from '@nestjs/config';
import { PersonContactEntity } from '../../entities/person_contact.entity';
import { getModelToken } from '@nestjs/sequelize';

describe('PersonContactService', () => {
  let service: PersonContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        PersonContactService,
        {
          provide: getModelToken(PersonContactEntity),
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

    service = module.get<PersonContactService>(PersonContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
