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
import { UserEntity } from './user.entity';
import { ClientEntity } from './client.entity';
import { FileEntity } from './file.entity';
import { AgentEntity } from './agent.entity';
import { ServicePriorityEntity } from './service_priority.entity';
import { BudgetEntity } from './budget.entity';

@Entity({ name: tableNames.service })
export class ServiceEntity {
  constructor(
    id: number,
    title: string,
    description: string,
    id_client: number,
    id_agent: number,
    id_priority: number,
    notice_date: Date,
    expected_date: Date,
    finish_date: Date,
    id_address: number,
    creation_date: Date,
    creation_user_id: number,
    id_budget: number,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.id_client = id_client;
    this.id_agent = id_agent;
    this.id_priority = id_priority;
    this.notice_date = notice_date;
    this.expected_date = expected_date;
    this.finish_date = finish_date;
    this.id_address = id_address;
    this.creation_date = creation_date;
    this.creation_user_id = creation_user_id;
    this.id_budget = id_budget;
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  title: string;

  @Column({ nullable: true })
  @ApiProperty()
  description: string;

  @Column({ nullable: false })
  @ApiProperty()
  id_client: number;

  @Column({ nullable: true })
  @ApiProperty()
  id_agent: number;

  @Column({ nullable: true })
  @ApiProperty()
  id_priority: number;

  @Column({ nullable: false })
  @ApiProperty()
  notice_date: Date;

  @Column({ nullable: true })
  @ApiProperty()
  expected_date: Date;

  @Column({ nullable: true })
  @ApiProperty()
  finish_date: Date;

  @Column({ nullable: true })
  @ApiProperty()
  id_address: number;

  @Column({ nullable: false })
  @ApiProperty()
  creation_date: Date;

  @Column({ nullable: false })
  @ApiProperty()
  creation_user_id: number;

  @Column({ nullable: false })
  @ApiProperty()
  id_budget: number;

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: 'id_client' })
  @ApiProperty()
  client: ClientEntity;

  @ManyToOne(() => AgentEntity)
  @JoinColumn({ name: 'id_agent' })
  @ApiProperty()
  agent: AgentEntity;

  @ManyToOne(() => ServicePriorityEntity)
  @JoinColumn({ name: 'id_priority' })
  @ApiProperty()
  priority: ServicePriorityEntity;

  @ManyToOne(() => AddressEntity)
  @JoinColumn({ name: 'id_address' })
  @ApiProperty()
  address: AddressEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'creation_user_id' })
  @ApiProperty()
  creation_user: UserEntity;

  @ManyToOne(() => BudgetEntity)
  @JoinColumn({ name: 'id_budget' })
  @ApiProperty()
  budget: BudgetEntity;

  @ManyToMany(() => FileEntity, { cascade: true })
  @JoinTable({ name: 'service_file' })
  files: FileEntity[];
}
