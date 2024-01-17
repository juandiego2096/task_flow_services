import { ApiProperty } from '@nestjs/swagger';

export class createUserCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
