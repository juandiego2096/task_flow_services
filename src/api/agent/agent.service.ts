import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentEntity } from '../../entities/agent.entity';
import { Repository } from 'typeorm';
import { createAgentDto } from './agent.type';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(AgentEntity)
    private readonly agentRepository: Repository<AgentEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createAgent(agent: createAgentDto): Promise<AgentEntity> {
    return this.agentRepository.save({
      name: agent.name,
      cif: agent.cif,
      phone: agent.phone,
      email: agent.email,
      id_address: agent.id_address,
    });
  }

  async getAgents(): Promise<AgentEntity[]> {
    return this.agentRepository.find();
  }

  async getAgentById(agentId: number): Promise<AgentEntity | null> {
    return await this.agentRepository.findOne({
      where: { id: agentId },
    });
  }

  async updateAgent(agent: AgentEntity) {
    return this.agentRepository.save(agent);
  }
}
