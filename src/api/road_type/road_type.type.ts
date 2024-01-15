import { ApiProperty } from '@nestjs/swagger';

export class createRoadTypeDto {
  @ApiProperty()
  name: string;
}
