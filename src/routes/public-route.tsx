import { Outlet, useLocation } from 'react-router';

import useAuthSession from '@/features/auth/hooks/use-auth-session';
import useDisabledState from '@/features/auth/hooks/use-disabled';
import AuthSuccess from '@/features/auth/components/success';
import { PATHS } from '@/constants/paths';

/**
 * 로그인한 사용자는 접근할 수 없는 페이지
 *
 * - 인증된 사용자의 경우, 성공 페이지를 잠시 보여준 후 리다이렉트 됩니다.
 * - 이미 인증된 사용자의 경우, 성공 페이지는 생략됩니다.
 */
export default function PublicRoute() {
  const { isLogin } = useAuthSession();
  const { authStatus } = useDisabledState();
  const { pathname } = useLocation();

  // 로그인 성공 페이지
  if (pathname === PATHS.AUTH.LOGIN && isLogin) {
    return <AuthSuccess feature='로그인' movePage='메인' />;
  }

  // 회원가입 성공 페이지
  if (pathname === PATHS.AUTH.SIGNUP && authStatus === 'success') {
    return <AuthSuccess feature='회원가입' movePage='로그인' />;
  }

  // 비밀번호 찾기 성공 페이지
  if (pathname === PATHS.AUTH.FIND.PASSWORD && authStatus === 'success') {
    return <AuthSuccess feature='메일 전송' movePage='로그인' />;
  }

  return <Outlet />;
}
