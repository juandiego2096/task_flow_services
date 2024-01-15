import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { RoadTypeEntity } from 'src/entities/road_type.entity';
import { Repository } from 'typeorm';
import { createRoadTypeDto } from './road_type.type';

@Injectable()
export class RoadTypeService {
  constructor(
    @InjectRepository(RoadTypeEntity)
    private readonly roadTypeRepository: Repository<RoadTypeEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createRoadType(roadType: createRoadTypeDto): Promise<RoadTypeEntity> {
    return this.roadTypeRepository.save({
      name: roadType.name,
    });
  }

  async getRoadTypes(): Promise<RoadTypeEntity[]> {
    return this.roadTypeRepository.find();
  }

  async getRoadTypeById(roadTypeId: number): Promise<RoadTypeEntity | null> {
    return await this.roadTypeRepository.findOne({
      where: { id: roadTypeId },
    });
  }

  async getRoadTypeByName(
    roadTypeName: string,
  ): Promise<RoadTypeEntity | null> {
    return await this.roadTypeRepository.findOne({
      where: { name: roadTypeName },
    });
  }

  async updateRoadType(roadType: RoadTypeEntity) {
    return this.roadTypeRepository.save(roadType);
  }
}
