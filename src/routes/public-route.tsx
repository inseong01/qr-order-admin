import { Outlet } from 'react-router';

import useAuthSession from '@/features/auth/hooks/use-auth-session';
import AuthSuccess from '@/features/auth/components/success';

/**
 * 로그인한 사용자는 접근할 수 없는 페이지
 *
 * 인증된 사용자의 경우, 성공 페이지를 잠시 보여준 후 리다이렉트 됩니다.
 * 이미 인증된 사용자의 경우, 성공 페이지는 생략됩니다.
 */
export default function PublicRoute() {
  const { isLogin } = useAuthSession();

  if (isLogin) {
    return <AuthSuccess />;
  }

  return <Outlet />;
}
