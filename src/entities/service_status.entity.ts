import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { tableNames } from '../constants/table.names';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: tableNames.service_status })
export class ServiceStatusEntity {
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
