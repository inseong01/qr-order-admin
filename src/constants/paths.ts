import { ROUTES } from './routes';

const ROOT = ROUTES.ROOT;
const AUTH = `/${ROUTES.AUTH}` as const;
const FIND = `${AUTH}/${ROUTES.FIND}` as const;
const CHANGE = `/${ROUTES.CHANGE}` as const;

export const PATHS = {
  ROOT: {
    MAIN: ROOT,
    CHANGE: {
      MAIN: CHANGE,
      PASSWORD: `${CHANGE}/password`,
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
