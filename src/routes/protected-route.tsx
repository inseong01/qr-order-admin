import { Navigate, Outlet } from 'react-router';

import useAuthSession from '@/features/auth/hooks/use-auth-session';
import LoadingSpinner from '@/features/load/spinner';

/**
 * @description 인증된 사용자만 접근 가능한 경로를 보호하는 컴포넌트
 * - 로딩 중일 때는 로딩 스피너를 보여줍니다.
 * - 로그인하지 않은 사용자는 로그인 페이지로 리디렉션합니다.
 */
export default function ProtectedRoute() {
  const { isLogin, isLoading } = useAuthSession();

  if (isLoading) return <LoadingSpinner />;

  if (!isLogin) return <Navigate to='/auth/login' replace />;

  return <Outlet />;
}
