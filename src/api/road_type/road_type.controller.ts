import { Controller } from '@nestjs/common';
import { RoadTypeService } from './road_type.service';

@Controller('road-type')
export class RoadTypeController {
  constructor(private readonly roadTypeService: RoadTypeService) {}
}
