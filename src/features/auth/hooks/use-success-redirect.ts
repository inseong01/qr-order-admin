import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useLocation, useNavigate } from 'react-router';

import { PATHS } from '@/constants/paths';
import { REDIRECT_DELAY } from '../const';
import { authStatusAtom } from '../store/auth-atom';
import { signOutUser } from '../util/auth-supabase-api';

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
        path = PATHS.ROOT.MAIN;
        break;
      }
      case PATHS.AUTH.SIGNUP:
      case PATHS.AUTH.FIND.PASSWORD: {
        replace = false;
        path = PATHS.AUTH.LOGIN;
        break;
      }
      case PATHS.ROOT.UPDATE.PASSWORD: {
        replace = true;
        path = PATHS.AUTH.LOGIN;
        break;
      }
    }

    if (!path) {
      console.error('Unexpected error: Path is not defined.');
      return;
    }

    if (pathname === PATHS.ROOT.UPDATE.PASSWORD) {
      setTimeout(() => {
        signOutUser();
      }, REDIRECT_DELAY);
    } else {
      setTimeout(() => {
        navigate(path, { replace });
      }, REDIRECT_DELAY);
    }
  }, [authStatus, pathname, navigate]);

  return;
}
