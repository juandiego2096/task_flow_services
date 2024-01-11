import { Test, TestingModule } from '@nestjs/testing';
import { ServicePriorityController } from './service_priority.controller';
import { ServicePriorityService } from './service_priority.service';

describe('ServicePriorityController', () => {
  let controller: ServicePriorityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicePriorityController],
      providers: [ServicePriorityService],
    }).compile();

    controller = module.get<ServicePriorityController>(ServicePriorityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
