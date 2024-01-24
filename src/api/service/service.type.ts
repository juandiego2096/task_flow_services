import { ApiProperty } from '@nestjs/swagger';

export class createServiceDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  id_client: number;

  @ApiProperty()
  id_agent: number;

  @ApiProperty()
  priority: number;

  @ApiProperty()
  status: number;

  @ApiProperty()
  notice_date: Date;

  @ApiProperty()
  expected_date: Date;

  @ApiProperty()
  finish_date: Date;

  @ApiProperty()
  id_address: number;

  @ApiProperty()
  creation_user_id: number;

  @ApiProperty()
  id_budget: number;
}

export class updateServiceDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  id_client: number;

  @ApiProperty()
  id_agent: number;

  @ApiProperty()
  priority: number;

  @ApiProperty()
  status: number;

  @ApiProperty()
  notice_date: Date;

  @ApiProperty()
  expected_date: Date;

  @ApiProperty()
  finish_date: Date;

  @ApiProperty()
  id_address: number;
}
