import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { tableNames } from '../constants/table.names';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: tableNames.person_contact })
export class PersonContactEntity {
  constructor(id: number, name: string, phone: string, observations: string) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.observations = observations;
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  name: string;

  @Column({ nullable: false })
  @ApiProperty()
  phone: string;

  @Column({ nullable: true })
  @ApiProperty()
  observations: string;
}
