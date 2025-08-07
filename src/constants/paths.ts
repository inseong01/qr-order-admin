import { ROUTES } from './routes';

const ROOT = ROUTES.ROOT;
const AUTH = `/${ROUTES.AUTH}` as const;
const FIND = `${AUTH}/${ROUTES.FIND}` as const;
const RESET = `${AUTH}/${ROUTES.RESET}` as const;

export const PATHS = {
  ROOT: ROOT,
  AUTH: {
    MAIN: AUTH,
    LOGIN: `${AUTH}/login`,
    LOGOUT: `${AUTH}/logout`,
    SIGNUP: `${AUTH}/signup`,
    FIND: {
      MAIN: FIND,
      PASSWORD: `${FIND}/password`,
    },
    RESET: {
      MAIN: RESET,
      PASSWORD: `${RESET}/password`,
    },
  },
} as const;
