import { ROUTES } from './routes';

const ROOT = ROUTES.ROOT;
const AUTH = `/${ROUTES.AUTH}` as const;
const FIND = `${AUTH}/${ROUTES.FIND}` as const;
const UPDATE = `/${ROUTES.UPDATE}` as const;

export const PATHS = {
  ROOT: {
    MAIN: ROOT,
    UPDATE: {
      MAIN: UPDATE,
      PASSWORD: `${UPDATE}/password`,
    },
  },
  AUTH: {
    MAIN: AUTH,
    LOGIN: `${AUTH}/login`,
    LOGOUT: `${AUTH}/logout`,
    SIGNUP: `${AUTH}/signup`,
    FIND: {
      MAIN: FIND,
      PASSWORD: `${FIND}/password`,
    },
  },
} as const;
