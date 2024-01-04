import { DataSource } from 'typeorm';

export const datasource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER || 'root',
  password: process.env.POSTGRES_PASSWORD || 'root',
  database: process.env.POSTGRES_DB || 'task_flow',
  entities: ['src/**/*.entity{.js}'],
  migrations: ['src/migrations/**/*.ts'],
  synchronize: true,
  migrationsRun: true,
  ssl: true,
});
