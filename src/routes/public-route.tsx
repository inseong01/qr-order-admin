import { useAtomValue } from 'jotai';
import { Navigate, Outlet } from 'react-router';

import { PATHS } from '@/constants/paths';
import { successStateAtom } from '@/features/auth/store/form-atom';
import useAuthSession from '@/features/auth/hooks/use-auth-session';

/**
 * 로그인한 사용자는 접근할 수 없는 페이지
 * (ex: 로그인, 회원가입)
 */
export default function PublicRoute() {
  const { isLogin } = useAuthSession();
  const isSuccess = useAtomValue(successStateAtom);

  if (isLogin && isSuccess) {
    return <Navigate to={PATHS.ROOT} replace />;
  }

  return <Outlet />;
}
