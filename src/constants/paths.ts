const ROOT = '/';
const AUTH = '/auth';
const FIND = `${AUTH}/find`;

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
  },
} as const;
