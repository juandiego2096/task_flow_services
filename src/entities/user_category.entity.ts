import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { tableNames } from '../constants/table.names';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: tableNames.user_category })
export class UserCategoryEntity {
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: string;

  @Column({ nullable: false })
  @ApiProperty()
  name: string;

  @Column({ nullable: true })
  @ApiProperty()
  description: string;
}
