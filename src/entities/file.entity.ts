import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { tableNames } from '../constants/table.names';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: tableNames.file })
export class FileEntity {
  constructor(id: number, name: string, path: string, type: string) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.type = type;
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  name: string;

  @Column({ nullable: false })
  @ApiProperty()
  path: string;

  @Column({ nullable: true })
  @ApiProperty()
  type: string;
}
