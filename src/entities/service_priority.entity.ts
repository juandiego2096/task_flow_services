import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { tableNames } from '../constants/table.names';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: tableNames.service_priority })
export class ServicePriorityEntity {
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  name: string;
}
