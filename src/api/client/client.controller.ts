import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientEntity } from '../../entities/client.entity';
import { createClientDto } from './client.type';

@UseGuards(AuthGuard)
@Controller('clients')
@ApiTags('Client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('createClient')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ClientEntity,
  })
  async createClient(@Body() newClient: createClientDto): Promise<ClientEntity | HttpException> {
    return await this.clientService.createClient(newClient);
  }

  @Get('getClients')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: ClientEntity,
  })
  async getClients(): Promise<ClientEntity[]> {
    return await this.clientService.getClients();
  }

  @Get('getClientById/:clientId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: ClientEntity,
  })
  async getClientById(@Param('clientId') clientId: number): Promise<ClientEntity | HttpException> {
    const clientFound = await this.clientService.getClientById(clientId);

    if (!clientFound) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }

    return clientFound;
  }

  @Get('getClientsByAgentId/:agentId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: ClientEntity,
  })
  async getClientsByAgentId(@Param('agentId') agentId: number): Promise<ClientEntity[]> {
    return await this.clientService.getClientsByAgentId(agentId);
  }

  @Patch('updateClient/:clientId')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
    type: ClientEntity,
  })
  async updateClient(@Request() req, @Param('clientId') clientId: number, @Body() updateClient: createClientDto) {
    /*     if (req.userRole !== (ROLES.SUPER_ADMIN && ROLES.ADMIN)) {
      throw new HttpException(
        'User not enabled to create a specie',
        HttpStatus.UNAUTHORIZED,
      );
    } */

    const client = await this.clientService.getClientById(clientId);
    if (!client) {
      throw new HttpException(`Client with id  ${clientId} not found`, HttpStatus.NOT_FOUND);
    }

    client.number = updateClient.number;
    client.name = updateClient.name;
    client.cif = updateClient.cif;
    client.phone = updateClient.phone;
    client.email = updateClient.email;
    client.id_address = updateClient.id_address;
    client.id_agent = updateClient.id_agent;
    client.observations = updateClient.observations;

    await this.clientService.updateClient(client);
  }
}
