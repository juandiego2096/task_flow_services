import { ApiProperty } from '@nestjs/swagger';

export class createNoticeDto {
  @ApiProperty()
  id_client: number;

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
}

export class updateNoticeDto {
  @ApiProperty()
  id_client: number;

  @ApiProperty()
  notice_date: Date;

  @ApiProperty()
  expected_date: Date;

  @ApiProperty()
  id_address: number;

  @ApiProperty()
  description: string;
}
