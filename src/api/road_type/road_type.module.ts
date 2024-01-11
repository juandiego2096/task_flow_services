import { Module } from '@nestjs/common';
import { RoadTypeService } from './road_type.service';
import { RoadTypeController } from './road_type.controller';

@Module({
  controllers: [RoadTypeController],
  providers: [RoadTypeService],
})
export class RoadTypeModule {}
