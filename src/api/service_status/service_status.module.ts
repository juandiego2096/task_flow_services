import { Module } from '@nestjs/common';
import { ServiceStatusService } from './service_status.service';
import { ServiceStatusController } from './service_status.controller';

@Module({
  controllers: [ServiceStatusController],
  providers: [ServiceStatusService],
})
export class ServiceStatusModule {}
