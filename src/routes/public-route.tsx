import { Outlet, useLocation } from 'react-router';

import useAuthSession from '@/features/auth/hooks/use-auth-session';
import AuthSuccess from '@/features/auth/components/success';
import { PATHS } from '@/constants/paths';
import useDisabledState from '@/features/auth/hooks/use-disabled';

/**
 * 로그인한 사용자는 접근할 수 없는 페이지
 *
 * 인증된 사용자의 경우, 성공 페이지를 잠시 보여준 후 리다이렉트 됩니다.
 * 이미 인증된 사용자의 경우, 성공 페이지는 생략됩니다.
 */
export default function PublicRoute() {
  const { isLogin } = useAuthSession();
  const { authStatus } = useDisabledState();
  const { pathname } = useLocation();

  // 로그인 성공 페이지
  if (isLogin) {
    return <AuthSuccess text='로그인' page='메인' />;
  }

  // 회원가입 성공 페이지
  if (pathname === PATHS.AUTH.SIGNUP && authStatus === 'success') {
    return <AuthSuccess text='회원가입' page='로그인' />;
  }

  return <Outlet />;
}
