import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router';

import { PATHS } from '@/constants/paths';
import { REDIRECT_DELAY } from '../const';
import { authStatusAtom } from '../store/auth-atom';

export default function useSuccessRedirect() {
  const authStatus = useAtomValue(authStatusAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus !== 'success') return;

    setTimeout(() => {
      navigate(PATHS.ROOT, { replace: true });
    }, REDIRECT_DELAY);
  }, [authStatus, navigate]);

  return;
}
