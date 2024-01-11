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
import { NoticeEntity } from './notice.entity';

@Entity({ name: tableNames.budget })
export class BudgetEntity {
  constructor(
    id: number,
    id_client: number,
    id_agent: number,
    notice_date: Date,
    expected_date: Date,
    id_address: number,
    description: string,
    creation_date: Date,
    creation_user_id: number,
    amount: number,
    id_notice: number,
  ) {
    this.id = id;
    this.id_client = id_client;
    this.id_agent = id_agent;
    this.notice_date = notice_date;
    this.expected_date = expected_date;
    this.id_address = id_address;
    this.description = description;
    this.creation_date = creation_date;
    this.creation_user_id = creation_user_id;
    this.amount = amount;
    this.id_notice = id_notice;
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: true })
  @ApiProperty()
  id_client: number;

  @Column({ nullable: true })
  @ApiProperty()
  id_agent: number;

  @Column({ nullable: false })
  @ApiProperty()
  notice_date: Date;

  @Column({ nullable: true })
  @ApiProperty()
  expected_date: Date;

  @Column({ nullable: true })
  @ApiProperty()
  id_address: number;

  @Column({ nullable: true })
  @ApiProperty()
  description: string;

  @Column({ nullable: false })
  @ApiProperty()
  creation_date: Date;

  @Column({ nullable: false })
  @ApiProperty()
  creation_user_id: number;

  @Column({ nullable: false })
  @ApiProperty()
  amount: number;

  @Column({ nullable: false })
  @ApiProperty()
  id_notice: number;

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: 'id_client' })
  @ApiProperty()
  client: ClientEntity;

  @ManyToOne(() => AgentEntity)
  @JoinColumn({ name: 'id_agent' })
  @ApiProperty()
  agent: AgentEntity;

  @ManyToOne(() => AddressEntity)
  @JoinColumn({ name: 'id_address' })
  @ApiProperty()
  address: AddressEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'creation_user_id' })
  @ApiProperty()
  creation_user: UserEntity;

  @ManyToOne(() => NoticeEntity)
  @JoinColumn({ name: 'id_notice' })
  @ApiProperty()
  notice: NoticeEntity;

  @ManyToMany(() => FileEntity, { cascade: true })
  @JoinTable({ name: 'budget_file' })
  files: FileEntity[];
}
