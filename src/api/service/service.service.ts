import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from 'src/entities/service.entity';
import { Repository } from 'typeorm';
import { createServiceDto } from './service.type';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createService(service: createServiceDto): Promise<ServiceEntity> {
    return this.serviceRepository.save({
      title: service.title,
      description: service.description,
      id_client: service.id_client,
      id_agent: service.id_agent,
      priority: service.priority,
      status: service.status,
      notice_date: service.notice_date,
      expected_date: service.expected_date,
      finish_date: service.finish_date,
      id_address: service.id_address,
      creation_user_id: service.creation_user_id,
      id_budget: service.id_budget,
    });
  }

  async getServices(): Promise<ServiceEntity[]> {
    return this.serviceRepository.find();
  }

  async getServiceById(serviceId: number): Promise<ServiceEntity | null> {
    return await this.serviceRepository.findOne({
      relations: ['client', 'agent', 'address', 'creation_user', 'budget'],
      where: { id: serviceId },
    });
  }

  async getServiceByBudgetId(budgetId: number): Promise<ServiceEntity | null> {
    return await this.serviceRepository.findOne({
      relations: ['client', 'agent', 'address', 'creation_user', 'budget'],
      where: { id_budget: budgetId },
    });
  }

  async updateService(service: ServiceEntity) {
    return this.serviceRepository.save(service);
  }
}
