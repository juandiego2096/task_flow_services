import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from 'src/entities/role.entity';
import { createRoleDto } from './role.type';

@UseGuards(AuthGuard)
@Controller('roles')
@ApiTags('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('createRole')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: RoleEntity,
  })
  async createRole(
    @Body() newRole: createRoleDto,
  ): Promise<RoleEntity | HttpException> {
    const roleByName = await this.roleService.getRoleByName(newRole.name);

    if (roleByName) {
      throw new HttpException(
        `Already exists a role created with name ${newRole.name}`,
        HttpStatus.FOUND,
      );
    }

    return await this.roleService.createRole(newRole);
  }

  @Get('getRoles')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: RoleEntity,
  })
  async getRoles(): Promise<RoleEntity[]> {
    return await this.roleService.getRoles();
  }

  @Get('getRoleById/:roleId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: RoleEntity,
  })
  async getRoleById(
    @Param('roleId') roleId: number,
  ): Promise<RoleEntity | HttpException> {
    const roleFound = await this.roleService.getRoleById(roleId);

    if (!roleFound) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    return roleFound;
  }

  @Patch('updateRole/:roleId')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
    type: RoleEntity,
  })
  async updateRole(
    @Request() req,
    @Param('roleId') roleId: number,
    @Body() updateRole: createRoleDto,
  ) {
    /*     if (req.userRole !== (ROLES.SUPER_ADMIN && ROLES.ADMIN)) {
      throw new HttpException(
        'User not enabled to create a specie',
        HttpStatus.UNAUTHORIZED,
      );
    } */

    const role = await this.roleService.getRoleById(roleId);
    if (!role) {
      throw new HttpException(
        `Role with id  ${roleId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    role.name = updateRole.name;
    role.description = updateRole.description;

    await this.roleService.updateRole(role);
  }
}
