import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { Repository } from 'typeorm';
import { createRoleDto } from './role.type';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createRole(role: createRoleDto): Promise<RoleEntity> {
    return this.roleRepository.save({
      name: role.name,
      description: role.description,
    });
  }

  async getRoles(): Promise<RoleEntity[]> {
    return this.roleRepository.find();
  }

  async getRoleById(roleId: number): Promise<RoleEntity | null> {
    return await this.roleRepository.findOne({
      where: { id: roleId },
    });
  }

  async getRoleByName(roleName: string): Promise<RoleEntity | null> {
    return await this.roleRepository.findOne({
      where: { name: roleName },
    });
  }

  async updateRole(role: RoleEntity) {
    return this.roleRepository.save(role);
  }
}
