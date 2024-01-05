import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { tableNames } from '../constants/table.names';
import { RoleEntity } from './role.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: tableNames.user })
export class UserEntity {
  constructor(
    id: string,
    id_role: string,
    name: string,
    username: string,
    password: string,
  ) {
    this.id = id;
    this.id_role = id_role;
    this.name = name;
    this.username = username;
    this.password = password;
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: string;

  @Column({ nullable: false })
  @ApiProperty()
  id_role: string;

  @Column({ nullable: false })
  @ApiProperty()
  name: string;

  @Column({ nullable: false, unique: true })
  @ApiProperty()
  username: string;

  @Column({ nullable: false })
  @ApiProperty()
  password: string;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  role: RoleEntity;
}
