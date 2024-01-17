import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from 'src/entities/client.entity';
import { Repository } from 'typeorm';
import { createClientDto } from './client.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createClient(client: createClientDto): Promise<ClientEntity> {
    return this.clientRepository.save({
      number: client.number,
      name: client.name,
      cif: client.cif,
      phone: client.phone,
      email: client.email,
      id_address: client.id_address,
      id_agent: client.id_agent,
      observations: client.observations,
    });
  }

  async getClients(): Promise<ClientEntity[]> {
    return this.clientRepository.find();
  }

  async getClientById(clientId: number): Promise<ClientEntity | null> {
    return await this.clientRepository.findOne({
      where: { id: clientId },
    });
  }

  async getClientsByAgentId(agentId: number): Promise<ClientEntity[]> {
    return await this.clientRepository.find({
      where: { id_agent: agentId },
    });
  }

  async updateClient(client: ClientEntity) {
    return this.clientRepository.save(client);
  }
}
