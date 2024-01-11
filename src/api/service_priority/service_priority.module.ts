import { Module } from '@nestjs/common';
import { ServicePriorityService } from './service_priority.service';
import { ServicePriorityController } from './service_priority.controller';

@Module({
  controllers: [ServicePriorityController],
  providers: [ServicePriorityService],
})
export class ServicePriorityModule {}
