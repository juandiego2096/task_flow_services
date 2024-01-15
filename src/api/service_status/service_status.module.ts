import { Module } from '@nestjs/common';
import { ServiceStatusService } from './service_status.service';
import { ServiceStatusController } from './service_status.controller';
import { ServiceStatusEntity } from 'src/entities/service_status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceStatusEntity])],
  controllers: [ServiceStatusController],
  providers: [ServiceStatusService],
})
export class ServiceStatusModule {}
