import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { createUserDto } from './user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(user: createUserDto): Promise<UserEntity> {
    const newPassword = await bcrypt.hash(user.password, +this.configService.get<number>('HASH_SALT', 0));
    return this.userRepository.save({
      id_role: user.id_role,
      name: user.name,
      username: user.username,
      password: newPassword,
    });
  }

  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserById(userId: number): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      relations: ['role'],
      where: { id: userId },
    });
  }

  async getUserByUsername(username: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      relations: ['role'],
      where: { username: username },
    });
  }

  async updateUser(user: UserEntity) {
    const newPassword = await bcrypt.hash(user.password, +this.configService.get<number>('HASH_SALT', 0));
    user.password = newPassword;

    return this.userRepository.save(user);
  }
}
