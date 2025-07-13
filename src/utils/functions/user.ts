import { T_User } from '../../types/user';
import { USERS } from '../constants/db';
import { ROUTES } from '../constants/routes';
import { USER_ROLES } from '../constants/user';

export const loginUser = (
  formData: Pick<T_User, 'email' | 'password' | 'roles'>,
) => {
  const { email, password, roles } = formData;

  if (!USERS.some(user => user.email === email)) {
    return {
      success: false,
      message: 'User not found',
    };
  }

  if (!USERS.some(user => user.email === email && user.password === password)) {
    return {
      success: false,
      message: 'Invalid password',
    };
  }

  if (
    USERS.some(
      user =>
        user.email === email &&
        user.password === password &&
        !user.roles.some(role => roles.includes(role)),
    )
  ) {
    return {
      success: false,
      message: `User does not have the required role: ${roles.join(', ')}`,
    };
  }

  const user = USERS.find(u => u.email === email && u.password === password);
  return {
    success: true,
    message: 'Login successful',
    user: {
      ...user,
      roles: formData.roles, // Ensure roles are set from form data
    },
  };
};

export const isUserAllowedForRoute = (
  route: (typeof ROUTES)[number],
  user: T_User | null,
) => {
  if (!user) return false;
  const USER_ACTION_TO_PERMISSION_MAP: {
    [key in (typeof ROUTES)[number]]: (typeof USER_ROLES)[number][];
  } = {
    audit: ['auditor', 'admin'],
    history: ['admin', 'auditor', 'viewer'],
    settings: ['admin', 'auditor', 'viewer'],
  };

  const routeAccess = USER_ACTION_TO_PERMISSION_MAP[route];
  return user.roles.some(role => routeAccess.includes(role));
};
