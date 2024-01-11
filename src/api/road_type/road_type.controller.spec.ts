import { Test, TestingModule } from '@nestjs/testing';
import { RoadTypeController } from './road_type.controller';
import { RoadTypeService } from './road_type.service';

describe('RoadTypeController', () => {
  let controller: RoadTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoadTypeController],
      providers: [RoadTypeService],
    }).compile();

    controller = module.get<RoadTypeController>(RoadTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
