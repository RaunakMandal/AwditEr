import { USER_ROLES } from '../utils/constants/user';

export type T_User = {
  id: string;
  email: string;
  password: string;
  name: string;
  roles: (typeof USER_ROLES)[number][];
};
