import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { RoadTypeService } from './road_type.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoadTypeEntity } from '../../entities/road_type.entity';
import { createRoadTypeDto } from './road_type.type';

@UseGuards(AuthGuard)
@Controller('road_types')
@ApiTags('RoadType')
export class RoadTypeController {
  constructor(private readonly roadTypeService: RoadTypeService) {}

  @Post('createRoadType')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: RoadTypeEntity,
  })
  async createRoadType(@Body() newRoadType: createRoadTypeDto): Promise<RoadTypeEntity | HttpException> {
    const roadTypeByName = await this.roadTypeService.getRoadTypeByName(newRoadType.name);

    if (roadTypeByName) {
      throw new HttpException(`Already exists a road type created with name ${newRoadType.name}`, HttpStatus.FOUND);
    }

    return await this.roadTypeService.createRoadType(newRoadType);
  }

  @Get('getRoadTypes')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: RoadTypeEntity,
  })
  async getRoadTypes(): Promise<RoadTypeEntity[]> {
    return await this.roadTypeService.getRoadTypes();
  }

  @Get('getRoadTypeById/:roadTypeId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: RoadTypeEntity,
  })
  async getRoadTypeById(@Param('roadTypeId') roadTypeId: number): Promise<RoadTypeEntity | HttpException> {
    const roadTypeFound = await this.roadTypeService.getRoadTypeById(roadTypeId);

    if (!roadTypeFound) {
      throw new HttpException('Road type not found', HttpStatus.NOT_FOUND);
    }

    return roadTypeFound;
  }

  @Patch('updateRoadType/:roadTypeId')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
    type: RoadTypeEntity,
  })
  async updateRoadType(@Request() req, @Param('roadTypeId') roadTypeId: number, @Body() updateRoadType: createRoadTypeDto) {
    /*     if (req.userRole !== (ROLES.SUPER_ADMIN && ROLES.ADMIN)) {
      throw new HttpException(
        'User not enabled to create a specie',
        HttpStatus.UNAUTHORIZED,
      );
    } */

    const roadType = await this.roadTypeService.getRoadTypeById(roadTypeId);
    if (!roadType) {
      throw new HttpException(`Road type with id  ${roadTypeId} not found`, HttpStatus.NOT_FOUND);
    }

    roadType.name = updateRoadType.name;

    await this.roadTypeService.updateRoadType(roadType);
  }
}
