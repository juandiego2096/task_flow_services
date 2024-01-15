import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicePriorityEntity } from 'src/entities/service_priority.entity';
import { Repository } from 'typeorm';
import { createServicePriorityDto } from './service_priority.type';

@Injectable()
export class ServicePriorityService {
  constructor(
    @InjectRepository(ServicePriorityEntity)
    private readonly servicePriorityRepository: Repository<ServicePriorityEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createServicePriority(
    servicePriority: createServicePriorityDto,
  ): Promise<ServicePriorityEntity> {
    return this.servicePriorityRepository.save({
      name: servicePriority.name,
    });
  }

  async getServicePriorities(): Promise<ServicePriorityEntity[]> {
    return this.servicePriorityRepository.find();
  }

  async getServicePriorityById(
    serviceStatusId: number,
  ): Promise<ServicePriorityEntity | null> {
    return await this.servicePriorityRepository.findOne({
      where: { id: serviceStatusId },
    });
  }

  async getServicePriorityByName(
    servicePriorityName: string,
  ): Promise<ServicePriorityEntity | null> {
    return await this.servicePriorityRepository.findOne({
      where: { name: servicePriorityName },
    });
  }

  async updateServicePriority(servicePriority: ServicePriorityEntity) {
    return this.servicePriorityRepository.save(servicePriority);
  }
}
