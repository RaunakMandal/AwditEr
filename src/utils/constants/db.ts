import { T_User } from '../../types/user';

export const USERS: T_User[] = [
  {
    id: '1',
    name: 'Auditor Viewer User',
    email: 'auditor@example.com',
    password: '123456',
    roles: ['auditor', 'viewer'],
  },
  {
    id: '2',
    name: 'Viewer User',
    email: 'viewer@example.com',
    password: '123456',
    roles: ['viewer'],
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '123456',
    roles: ['admin'],
  },
  {
    id: '4',
    name: 'Auditor User 2',
    email: 'auditor2@example.com',
    password: '123456',
    roles: ['auditor'],
  },
];
