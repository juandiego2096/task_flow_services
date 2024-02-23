import { Test, TestingModule } from '@nestjs/testing';
import { RoadTypeController } from './road_type.controller';
import { RoadTypeService } from './road_type.service';
import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/sequelize';
import { RoadTypeEntity } from '../../entities/road_type.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../../entities/user.entity';

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

describe('RoadTypeController', () => {
  let controller: RoadTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [RoadTypeController],
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

    controller = module.get<RoadTypeController>(RoadTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
