import { Test, TestingModule } from '@nestjs/testing';
import { RoadTypeService } from './road_type.service';

describe('RoadTypeService', () => {
  let service: RoadTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoadTypeService],
    }).compile();

    service = module.get<RoadTypeService>(RoadTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
