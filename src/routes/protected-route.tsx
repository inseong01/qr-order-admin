import { Navigate, Outlet, useLocation } from 'react-router';

import { PATHS } from '@/constants/paths';
import LoadingSpinner from '@/features/load/spinner';
import useAuthSession from '@/features/auth/hooks/use-auth-session';
import useDisabledState from '@/features/auth/hooks/use-disabled';
import AuthSuccess from '@/features/auth/components/success';

/**
 * @description 인증된 사용자만 접근 가능한 경로를 보호하는 컴포넌트
 * - 로딩 중일 때는 로딩 스피너를 보여줍니다.
 * - 로그인하지 않은 사용자는 로그인 페이지로 리디렉션합니다.
 */
export default function ProtectedRoute() {
  const { isLogin } = useAuthSession();
  const { authStatus } = useDisabledState();
  const { pathname } = useLocation();

  if (authStatus === 'loading') return <LoadingSpinner />;

  if (!isLogin) return <Navigate to={PATHS.AUTH.LOGIN} replace />;

  // 비밀번호 재설정 인증 성공 페이지
  if (pathname === PATHS.ROOT.CHANGE.PASSWORD && authStatus === 'success') {
    return <AuthSuccess feature='비밀번호 재설정' movePage='로그인' />;
  }

  return <Outlet />;
}
