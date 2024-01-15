import { ApiProperty } from '@nestjs/swagger';

export class createServicePriorityDto {
  @ApiProperty()
  name: string;
}
