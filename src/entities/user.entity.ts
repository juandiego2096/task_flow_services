import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { tableNames } from '../constants/table.names';
import { RoleEntity } from './role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserCategoryEntity } from './user_category.entity';

@Entity({ name: tableNames.user })
export class UserEntity {
  constructor(id: number, id_role: number, name: string, username: string, password: string) {
    this.id = id;
    this.id_role = id_role;
    this.name = name;
    this.username = username;
    this.password = password;
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  id_role: number;

  @Column({ nullable: false })
  @ApiProperty()
  name: string;

  @Column({ nullable: false, unique: true })
  @ApiProperty()
  username: string;

  @Column({ nullable: false })
  @ApiProperty()
  password: string;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'id_role' })
  @ApiProperty()
  role: RoleEntity;

  @ManyToMany(() => UserCategoryEntity, { cascade: true })
  @JoinTable({ name: 'user_category_user' })
  categories: UserCategoryEntity[];
}
