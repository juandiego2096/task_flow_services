import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceStatusEntity } from 'src/entities/service_status.entity';
import { Repository } from 'typeorm';
import { createServiceStatusDto } from './service_status.type';

@Injectable()
export class ServiceStatusService {
  constructor(
    @InjectRepository(ServiceStatusEntity)
    private readonly serviceStatusRepository: Repository<ServiceStatusEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createServiceStatus(
    serviceStatus: createServiceStatusDto,
  ): Promise<ServiceStatusEntity> {
    return this.serviceStatusRepository.save({
      name: serviceStatus.name,
    });
  }

  async getServiceStatuses(): Promise<ServiceStatusEntity[]> {
    return this.serviceStatusRepository.find();
  }

  async getServiceStatusById(
    serviceStatusId: number,
  ): Promise<ServiceStatusEntity | null> {
    return await this.serviceStatusRepository.findOne({
      where: { id: serviceStatusId },
    });
  }

  async getServiceStatusByName(
    serviceStatusName: string,
  ): Promise<ServiceStatusEntity | null> {
    return await this.serviceStatusRepository.findOne({
      where: { name: serviceStatusName },
    });
  }

  async updateServiceStatus(serviceStatus: ServiceStatusEntity) {
    return this.serviceStatusRepository.save(serviceStatus);
  }
}
