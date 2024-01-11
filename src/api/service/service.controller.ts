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
import { ServiceService } from './service.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServiceEntity } from 'src/entities/service.entity';
import { createServiceDto, updateServiceDto } from './service.type';

@UseGuards(AuthGuard)
@Controller('services')
@ApiTags('Service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('createService')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ServiceEntity,
  })
  async createUser(
    @Body() newService: createServiceDto,
  ): Promise<ServiceEntity | HttpException> {
    const serviceFoundBybudgetId =
      await this.serviceService.getServiceByBudgetId(newService.id_budget);

    if (serviceFoundBybudgetId) {
      throw new HttpException(
        `Already exists a service created from the budget with id ${newService.id_budget}`,
        HttpStatus.FOUND,
      );
    }

    return await this.serviceService.createService(newService);
  }

  @Get('getServices')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: ServiceEntity,
  })
  async getUsers(): Promise<ServiceEntity[]> {
    return await this.serviceService.getServices();
  }

  @Get('getServiceById/:serviceId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: ServiceEntity,
  })
  async getUserById(
    @Param('serviceId') serviceId: number,
  ): Promise<ServiceEntity | HttpException> {
    const userFound = await this.serviceService.getServiceById(serviceId);

    if (!userFound) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  @Patch('updateService/:serviceId')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
    type: ServiceEntity,
  })
  async updateUser(
    @Request() req,
    @Param('serviceId') serviceId: number,
    @Body() updateService: updateServiceDto,
  ) {
    /*     if (req.userRole !== (ROLES.SUPER_ADMIN && ROLES.ADMIN)) {
      throw new HttpException(
        'User not enabled to create a specie',
        HttpStatus.UNAUTHORIZED,
      );
    } */

    const service = await this.serviceService.getServiceById(serviceId);
    if (!service) {
      throw new HttpException(
        `Service with id  ${serviceId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    service.title = updateService.title;
    service.description = updateService.description;
    service.id_client = updateService.id_client;
    service.id_agent = updateService.id_agent;
    service.id_priority = updateService.id_priority;
    service.notice_date = updateService.notice_date;
    service.expected_date = updateService.expected_date;
    service.finish_date = updateService.finish_date;
    service.id_address = updateService.id_address;

    await this.serviceService.updateService(service);
  }
}
