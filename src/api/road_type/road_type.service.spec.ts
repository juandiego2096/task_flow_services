import { Test, TestingModule } from '@nestjs/testing';
import { RoadTypeService } from './road_type.service';
import { RoadTypeEntity } from '../../entities/road_type.entity';
import { getModelToken } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

const arrayRoadType = [
  {
    id: 1,
    name: 'roadtype #1',
  },
  {
    id: 2,
    lastName: 'roadtype #2',
  },
];

const oneRoadType = {
  id: 1,
  name: 'roadtype #1',
};

describe('RoadTypeService', () => {
  let service: RoadTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        RoadTypeService,
        {
          provide: getModelToken(RoadTypeEntity),
          useValue: {
            findAll: jest.fn(() => arrayRoadType),
            findOne: jest.fn(),
            create: jest.fn(() => oneRoadType),
            remove: jest.fn(),
            destroy: jest.fn(() => oneRoadType),
          },
        },
      ],
    }).compile();

    service = module.get<RoadTypeService>(RoadTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
