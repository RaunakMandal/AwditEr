import {
  USER_ROLE_ADMIN,
  USER_ROLE_AUDITOR,
  USER_ROLE_VIEWER,
  USER_ROLES,
} from './user';

export const USER_ACTION_ADD = 'add';
export const USER_ACTION_VIEW = 'view';
export const USER_ACTION_DELETE = 'delete';

export const USER_ACTIONS = [
  USER_ACTION_ADD,
  USER_ACTION_VIEW,
  USER_ACTION_DELETE,
] as const;

export const USER_ACTION_PERMISSIONS: {
  [key in (typeof USER_ACTIONS)[number]]: (typeof USER_ROLES)[keyof typeof USER_ROLES][];
} = {
  add: [USER_ROLE_AUDITOR],
  view: [USER_ROLE_ADMIN, USER_ROLE_AUDITOR, USER_ROLE_VIEWER],
  delete: [USER_ROLE_ADMIN],
};
