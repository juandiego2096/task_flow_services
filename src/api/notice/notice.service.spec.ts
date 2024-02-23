import { Test, TestingModule } from '@nestjs/testing';
import { NoticeService } from './notice.service';
import { ConfigModule } from '@nestjs/config';
import { NoticeEntity } from '../../entities/notice.entity';
import { getModelToken } from '@nestjs/sequelize';

describe('NoticeService', () => {
  let service: NoticeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
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
      ],
    }).compile();

    service = module.get<NoticeService>(NoticeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
