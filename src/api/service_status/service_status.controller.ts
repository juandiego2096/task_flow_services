import { Controller } from '@nestjs/common';
import { ServiceStatusService } from './service_status.service';

@Controller('service-status')
export class ServiceStatusController {
  constructor(private readonly serviceStatusService: ServiceStatusService) {}
}
