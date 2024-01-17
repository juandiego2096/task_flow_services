import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AgentService } from './agent.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AgentEntity } from 'src/entities/agent.entity';
import { createAgentDto } from './agent.type';

@UseGuards(AuthGuard)
@Controller('agents')
@ApiTags('Agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('createAgent')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AgentEntity,
  })
  async createAgent(
    @Body() newAgent: createAgentDto,
  ): Promise<AgentEntity | HttpException> {
    return await this.agentService.createAgent(newAgent);
  }

  @Get('getAgents')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: AgentEntity,
  })
  async getAgents(): Promise<AgentEntity[]> {
    return await this.agentService.getAgents();
  }

  @Get('getAgentById/:agentId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: AgentEntity,
  })
  async getAgentById(
    @Param('agentId') agentId: number,
  ): Promise<AgentEntity | HttpException> {
    const agentFound = await this.agentService.getAgentById(agentId);

    if (!agentFound) {
      throw new HttpException('Agent not found', HttpStatus.NOT_FOUND);
    }

    return agentFound;
  }

  @Patch('updateAgent/:agentId')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
    type: AgentEntity,
  })
  async updateAgent(
    @Request() req,
    @Param('agentId') agentId: number,
    @Body() updateAgent: createAgentDto,
  ) {
    /*     if (req.userRole !== (ROLES.SUPER_ADMIN && ROLES.ADMIN)) {
      throw new HttpException(
        'User not enabled to create a specie',
        HttpStatus.UNAUTHORIZED,
      );
    } */

    const agent = await this.agentService.getAgentById(agentId);
    if (!agent) {
      throw new HttpException(
        `Agent with id  ${agentId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    agent.name = updateAgent.name;
    agent.cif = updateAgent.cif;
    agent.phone = updateAgent.phone;
    agent.email = updateAgent.email;
    agent.id_address = updateAgent.id_address;

    await this.agentService.updateAgent(agent);
  }
}
