import { Test, TestingModule } from '@nestjs/testing';
import { ServicePriorityService } from './service_priority.service';

describe('ServicePriorityService', () => {
  let service: ServicePriorityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicePriorityService],
    }).compile();

    service = module.get<ServicePriorityService>(ServicePriorityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
