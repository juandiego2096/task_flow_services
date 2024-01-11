import { Controller } from '@nestjs/common';
import { ServicePriorityService } from './service_priority.service';

@Controller('service-priority')
export class ServicePriorityController {
  constructor(private readonly servicePriorityService: ServicePriorityService) {}
}
