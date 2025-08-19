import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useLocation, useNavigate } from 'react-router';

import { REDIRECT_DELAY } from '../const';
import { authStatusAtom } from '../store/auth-atom';
import { PATHS } from '@/constants/paths';

export default function useSuccessRedirect() {
  const authStatus = useAtomValue(authStatusAtom);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (authStatus !== 'success') return;

    let path = '';
    let replace = false;
    switch (pathname) {
      case PATHS.AUTH.LOGIN: {
        replace = true;
        path = PATHS.ROOT;
        break;
      }
      case PATHS.AUTH.SIGNUP:
      case PATHS.AUTH.FIND.PASSWORD:
      case PATHS.AUTH.RESET.PASSWORD: {
        replace = false;
        path = PATHS.AUTH.LOGIN;
        break;
      }
    }

    if (!path) {
      console.error('Unexpected error: Path is not defined.');
      return;
    }

    setTimeout(() => {
      navigate(path, { replace });
    }, REDIRECT_DELAY);
  }, [authStatus, pathname, navigate]);

  return;
}
