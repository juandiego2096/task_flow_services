import { Module } from '@nestjs/common';
import { ServicePriorityService } from './service_priority.service';
import { ServicePriorityController } from './service_priority.controller';
import { ServicePriorityEntity } from 'src/entities/service_priority.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ServicePriorityEntity])],
  controllers: [ServicePriorityController],
  providers: [ServicePriorityService],
})
export class ServicePriorityModule {}
