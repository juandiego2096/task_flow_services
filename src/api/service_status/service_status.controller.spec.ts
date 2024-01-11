import { Test, TestingModule } from '@nestjs/testing';
import { ServiceStatusController } from './service_status.controller';
import { ServiceStatusService } from './service_status.service';

describe('ServiceStatusController', () => {
  let controller: ServiceStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceStatusController],
      providers: [ServiceStatusService],
    }).compile();

    controller = module.get<ServiceStatusController>(ServiceStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
