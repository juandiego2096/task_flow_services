import { Module } from '@nestjs/common';
import { RoadTypeService } from './road_type.service';
import { RoadTypeController } from './road_type.controller';
import { RoadTypeEntity } from 'src/entities/road_type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoadTypeEntity])],
  controllers: [RoadTypeController],
  providers: [RoadTypeService],
})
export class RoadTypeModule {}
