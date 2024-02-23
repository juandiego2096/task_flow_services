import { Test, TestingModule } from '@nestjs/testing';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/sequelize';
import { NoticeEntity } from '../../entities/notice.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../../entities/user.entity';

describe('NoticeController', () => {
  let controller: NoticeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [NoticeController],
      providers: [
        NoticeService,
        {
          provide: getModelToken(NoticeEntity),
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

    controller = module.get<NoticeController>(NoticeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
