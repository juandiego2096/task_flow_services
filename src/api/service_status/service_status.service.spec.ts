import { Test, TestingModule } from '@nestjs/testing';
import { ServiceStatusService } from './service_status.service';

describe('ServiceStatusService', () => {
  let service: ServiceStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceStatusService],
    }).compile();

    service = module.get<ServiceStatusService>(ServiceStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
