import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { tableNames } from '../constants/table.names';
import { UserEntity } from './user.entity';

@Entity({ name: tableNames.role })
export class RoleEntity {
  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
