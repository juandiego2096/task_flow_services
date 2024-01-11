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

@Entity({ name: tableNames.notice })
export class NoticeEntity {
  constructor(
    id: number,
    id_client: number,
    notice_date: Date,
    expected_date: Date,
    id_address: number,
    description: string,
    creation_date: Date,
    creation_user_id: number,
  ) {
    this.id = id;
    this.id_client = id_client;
    this.notice_date = notice_date;
    this.expected_date = expected_date;
    this.id_address = id_address;
    this.description = description;
    this.creation_date = creation_date;
    this.creation_user_id = creation_user_id;
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: true })
  @ApiProperty()
  id_client: number;

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

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: 'id_client' })
  @ApiProperty()
  client: ClientEntity;

  @ManyToOne(() => AddressEntity)
  @JoinColumn({ name: 'id_address' })
  @ApiProperty()
  address: AddressEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'creation_user_id' })
  @ApiProperty()
  creation_user: UserEntity;

  @ManyToMany(() => FileEntity, { cascade: true })
  @JoinTable({ name: 'notice_file' })
  files: FileEntity[];
}
