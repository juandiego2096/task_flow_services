import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { tableNames } from '../constants/table.names';
import { RoleEntity } from './role.entity';

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
  id: string;

  @Column({ nullable: false })
  id_role: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  role: RoleEntity;
}
