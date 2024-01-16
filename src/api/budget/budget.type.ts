import { ApiProperty } from '@nestjs/swagger';

export class createBudgetDto {
  @ApiProperty()
  id_client: number;

  @ApiProperty()
  id_agent: number;

  @ApiProperty()
  notice_date: Date;

  @ApiProperty()
  expected_date: Date;

  @ApiProperty()
  id_address: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  creation_date: Date;

  @ApiProperty()
  creation_user_id: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  id_notice: number;
}

export class updateBudgetDto {
  @ApiProperty()
  id_client: number;

  @ApiProperty()
  id_agent: number;

  @ApiProperty()
  notice_date: Date;

  @ApiProperty()
  expected_date: Date;

  @ApiProperty()
  id_address: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  id_notice: number;
}
