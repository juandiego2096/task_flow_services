import { registerAs } from '@nestjs/config';

export const tableNames = {
  role: 'role',
  user: 'user',
  user_category: 'user_category',
  user_category_user: 'user_category_user',
  road_type: 'road_type',
  address: 'address',
  agent: 'agent',
  agent_person_contact: 'agent_person_contact',
  budget: 'budget',
  budget_file: 'budget_file',
  client: 'client',
  client_person_contact: 'client_person_contact',
  file: 'file',
  notice: 'notice',
  notice_file: 'notice_file',
  person_contact: 'person_contact',
  service: 'service',
  service_file: 'service_file',
  service_person_contact: 'service_person_contact',
  service_priority: 'service_priority',
  service_status: 'service_status',
};

export type TableNames = typeof tableNames;

export default registerAs('tableNames', () => tableNames);
