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
import { ServiceStatusService } from './service_status.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServiceStatusEntity } from 'src/entities/service_status.entity';
import { createServiceStatusDto } from './service_status.type';

@UseGuards(AuthGuard)
@Controller('service_statuses')
@ApiTags('ServiceStatus')
export class ServiceStatusController {
  constructor(private readonly serviceStatusService: ServiceStatusService) {}

  @Post('createServiceStatus')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ServiceStatusEntity,
  })
  async createServiceStatus(
    @Body() newServiceStatus: createServiceStatusDto,
  ): Promise<ServiceStatusEntity | HttpException> {
    const serviceStatusByName =
      await this.serviceStatusService.getServiceStatusByName(
        newServiceStatus.name,
      );

    if (serviceStatusByName) {
      throw new HttpException(
        `Already exists a service status created with name ${newServiceStatus.name}`,
        HttpStatus.FOUND,
      );
    }

    return await this.serviceStatusService.createServiceStatus(
      newServiceStatus,
    );
  }

  @Get('getServiceStatuses')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: ServiceStatusEntity,
  })
  async getServiceStatuses(): Promise<ServiceStatusEntity[]> {
    return await this.serviceStatusService.getServiceStatuses();
  }

  @Get('getServiceStatusById/:serviceStatusId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: ServiceStatusEntity,
  })
  async getUserById(
    @Param('serviceStatusId') serviceStatusId: number,
  ): Promise<ServiceStatusEntity | HttpException> {
    const serviceStatusFound =
      await this.serviceStatusService.getServiceStatusById(serviceStatusId);

    if (!serviceStatusFound) {
      throw new HttpException('Service status not found', HttpStatus.NOT_FOUND);
    }

    return serviceStatusFound;
  }

  @Patch('updateServiceStatus/:serviceStatusId')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
    type: ServiceStatusEntity,
  })
  async updateServiceStatus(
    @Request() req,
    @Param('serviceStatusId') serviceStatusId: number,
    @Body() updateServiceStatus: createServiceStatusDto,
  ) {
    /*     if (req.userRole !== (ROLES.SUPER_ADMIN && ROLES.ADMIN)) {
      throw new HttpException(
        'User not enabled to create a specie',
        HttpStatus.UNAUTHORIZED,
      );
    } */

    const serviceStatus =
      await this.serviceStatusService.getServiceStatusById(serviceStatusId);
    if (!serviceStatus) {
      throw new HttpException(
        `Service status with id  ${serviceStatusId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    serviceStatus.name = updateServiceStatus.name;

    await this.serviceStatusService.updateServiceStatus(serviceStatus);
  }
}
