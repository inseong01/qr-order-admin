import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { resetAllFormsAtom } from '../store/auth-atom';
import { useLocation } from 'react-router';
import { PATHS } from '@/constants/paths';

/**
 * 경로 이동마다 폼 상태 초기화하는 커스텀 훅
 *
 * 해당: 인증이 필요한 라우터
 */
export default function useResetAuthForm() {
  const { pathname } = useLocation();
  const resetForms = useSetAtom(resetAllFormsAtom);

  useEffect(() => {
    if (pathname.startsWith(PATHS.AUTH.MAIN)) {
      resetForms();
    }
  }, [pathname]);

  return;
}
