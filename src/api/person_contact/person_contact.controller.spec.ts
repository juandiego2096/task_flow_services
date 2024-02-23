import { Test, TestingModule } from '@nestjs/testing';
import { PersonContactController } from './person_contact.controller';
import { PersonContactService } from './person_contact.service';
import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/sequelize';
import { PersonContactEntity } from '../../entities/person_contact.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../../entities/user.entity';

describe('PersonContactController', () => {
  let controller: PersonContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [PersonContactController],
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

    controller = module.get<PersonContactController>(PersonContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
