import { registerAs } from '@nestjs/config';

export const tableNames = {
  role: 'role',
  user: 'user',
  user_category: 'user_category',
  user_category_user: 'user_category_user',
};

export type TableNames = typeof tableNames;

export default registerAs('tableNames', () => tableNames);
