import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { tableNames } from '../constants/table.names';
import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from './address.entity';
import { AgentEntity } from './agent.entity';
import { PersonContactEntity } from './person_contact.entity';

@Entity({ name: tableNames.client })
export class ClientEntity {
  constructor(
    id: number,
    number: string,
    name: string,
    cif: string,
    phone: string,
    email: string,
    id_address: number,
    id_agent: number,
    observations: string,
  ) {
    this.id = id;
    this.number = number;
    this.name = name;
    this.cif = cif;
    this.phone = phone;
    this.email = email;
    this.id_address = id_address;
    this.id_agent = id_agent;
    this.observations = observations;
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  number: string;

  @Column({ nullable: true })
  @ApiProperty()
  name: string;

  @Column({ nullable: true })
  @ApiProperty()
  cif: string;

  @Column({ nullable: true })
  @ApiProperty()
  phone: string;

  @Column({ nullable: true })
  @ApiProperty()
  email: string;

  @Column({ nullable: false })
  @ApiProperty()
  id_address: number;

  @Column({ nullable: true })
  @ApiProperty()
  id_agent: number;

  @Column({ nullable: true })
  @ApiProperty()
  observations: string;

  @ManyToOne(() => AddressEntity)
  @JoinColumn({ name: 'id_address' })
  @ApiProperty()
  address: AddressEntity;

  @ManyToOne(() => AgentEntity)
  @JoinColumn({ name: 'id_agent' })
  @ApiProperty()
  agent: AgentEntity;

  @ManyToMany(() => PersonContactEntity, { cascade: true })
  @JoinTable({ name: 'client_person_contact' })
  people_contact: PersonContactEntity[];
}
