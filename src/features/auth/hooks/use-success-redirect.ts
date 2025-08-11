import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router';

import { PATHS } from '@/constants/paths';
import { successStateAtom } from '../store/form-atom';
import { REDIRECT_DELAY } from '../const';

export default function useSuccessRedirect() {
  const isSuccess = useAtomValue(successStateAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSuccess) return;

    setTimeout(() => {
      navigate(PATHS.ROOT, { replace: true });
    }, REDIRECT_DELAY);
  }, [isSuccess, navigate]);

  return;
}
