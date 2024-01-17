import { ApiProperty } from '@nestjs/swagger';

export class createAddressDto {
  @ApiProperty()
  id_road_type: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  complementary: string;

  @ApiProperty()
  number: number;

  @ApiProperty()
  postal_code: string;

  @ApiProperty()
  province: string;

  @ApiProperty()
  location: string;
}
