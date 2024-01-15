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
import { ServicePriorityService } from './service_priority.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServicePriorityEntity } from 'src/entities/service_priority.entity';
import { createServicePriorityDto } from './service_priority.type';

@UseGuards(AuthGuard)
@Controller('service_priorities')
@ApiTags('ServicePriority')
export class ServicePriorityController {
  constructor(
    private readonly servicePriorityService: ServicePriorityService,
  ) {}

  @Post('createServicePririty')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ServicePriorityEntity,
  })
  async createServicePriority(
    @Body() newServicePriority: createServicePriorityDto,
  ): Promise<ServicePriorityEntity | HttpException> {
    const servicePriorityByName =
      await this.servicePriorityService.getServicePriorityByName(
        newServicePriority.name,
      );

    if (servicePriorityByName) {
      throw new HttpException(
        `Already exists a service priority created with name ${newServicePriority.name}`,
        HttpStatus.FOUND,
      );
    }

    return await this.servicePriorityService.createServicePriority(
      newServicePriority,
    );
  }

  @Get('getServicePriorities')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: ServicePriorityEntity,
  })
  async getServicePriorities(): Promise<ServicePriorityEntity[]> {
    return await this.servicePriorityService.getServicePriorities();
  }

  @Get('getServicePriorityById/:servicePriorityId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: ServicePriorityEntity,
  })
  async getServicePriorityById(
    @Param('servicePriorityId') servicePriorityId: number,
  ): Promise<ServicePriorityEntity | HttpException> {
    const servicePriorityFound =
      await this.servicePriorityService.getServicePriorityById(
        servicePriorityId,
      );

    if (!servicePriorityFound) {
      throw new HttpException(
        'Service priority not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return servicePriorityFound;
  }

  @Patch('updateServicePriority/:servicePriotityId')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
    type: ServicePriorityEntity,
  })
  async updateServicePriority(
    @Request() req,
    @Param('servicePriorityId') servicePriorityId: number,
    @Body() updateServicePriority: createServicePriorityDto,
  ) {
    /*     if (req.userRole !== (ROLES.SUPER_ADMIN && ROLES.ADMIN)) {
      throw new HttpException(
        'User not enabled to create a specie',
        HttpStatus.UNAUTHORIZED,
      );
    } */

    const servicePriority =
      await this.servicePriorityService.getServicePriorityById(
        servicePriorityId,
      );
    if (!servicePriority) {
      throw new HttpException(
        `Service priority with id  ${servicePriorityId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    servicePriority.name = updateServicePriority.name;

    await this.servicePriorityService.updateServicePriority(servicePriority);
  }
}
