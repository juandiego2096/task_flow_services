import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export default function ofConfig(
  configService: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST', 'localhost'),
    port: Number(configService.get<string>('POSTGRES_PORT', '5432')),
    username: configService.get<string>('POSTGRES_USER', 'root'),
    password: configService.get<string>('POSTGRES_PASSWORD', 'root'),
    database: configService.get<string>('POSTGRES_DB', 'task_flow'),
    entities: [join(__dirname, '../../', '**', '*.entity.{ts,js}')],
    migrations: [join(__dirname, '../../', '**', 'migrations/**/*.ts')],
    retryAttempts: 20,
    synchronize: true,
    ssl: true,
  };
}
