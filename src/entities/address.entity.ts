import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { tableNames } from '../constants/table.names';
import { ApiProperty } from '@nestjs/swagger';
import { RoadTypeEntity } from './road_type.entity';

@Entity({ name: tableNames.address })
export class AddressEntity {
  constructor(
    id: number,
    id_road_type: number,
    name: string,
    complementary: string,
    number: number,
    postal_code: string,
    province: string,
    location: string,
  ) {
    this.id = id;
    this.id_road_type = id_road_type;
    this.name = name;
    this.complementary = complementary;
    this.number = number;
    this.postal_code = postal_code;
    this.province = province;
    this.location = location;
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  id_road_type: number;

  @Column({ nullable: false, unique: true })
  @ApiProperty()
  name: string;

  @Column({ nullable: true })
  @ApiProperty()
  complementary: string;

  @Column({ nullable: true })
  @ApiProperty()
  number: number;

  @Column({ nullable: true })
  @ApiProperty()
  postal_code: string;

  @Column({ nullable: true })
  @ApiProperty()
  province: string;

  @Column({ nullable: true })
  @ApiProperty()
  location: string;

  @ManyToOne(() => RoadTypeEntity)
  @JoinColumn({ name: 'id_road_type' })
  @ApiProperty()
  road_type: RoadTypeEntity;
}
