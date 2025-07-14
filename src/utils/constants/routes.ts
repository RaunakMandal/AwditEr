export const ROUTE_AUDIT_FORM = 'audit';
export const ROUTE_AUDIT_HISTORY = 'history';
export const ROUTE_SETTINGS = 'settings';

export const ROUTES = [
  ROUTE_AUDIT_FORM,
  ROUTE_AUDIT_HISTORY,
  ROUTE_SETTINGS,
] as const;

export const ROUTE_TO_ICON_MAP = {
  [ROUTE_AUDIT_FORM]: 'audit',
  [ROUTE_AUDIT_HISTORY]: 'history',
  [ROUTE_SETTINGS]: 'setting',
};
