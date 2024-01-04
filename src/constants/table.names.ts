import { registerAs } from '@nestjs/config';

export const tableNames = {
  role: 'role',
  user: 'user',
};

export type TableNames = typeof tableNames;

export default registerAs('tableNames', () => tableNames);
