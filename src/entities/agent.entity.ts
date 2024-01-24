import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { tableNames } from '../constants/table.names';
import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from './address.entity';
import { PersonContactEntity } from './person_contact.entity';

@Entity({ name: tableNames.agent })
export class AgentEntity {
  constructor(id: number, name: string, cif: string, phone: string, email: string, id_address: number) {
    this.id = id;
    this.name = name;
    this.cif = cif;
    this.phone = phone;
    this.email = email;
    this.id_address = id_address;
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
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

  @Column({ nullable: true })
  @ApiProperty()
  id_address: number;

  @ManyToOne(() => AddressEntity)
  @JoinColumn({ name: 'id_address' })
  @ApiProperty()
  address: AddressEntity;

  @ManyToMany(() => PersonContactEntity, { cascade: true })
  @JoinTable({ name: 'agent_person_contact' })
  people_contact: PersonContactEntity[];
}
