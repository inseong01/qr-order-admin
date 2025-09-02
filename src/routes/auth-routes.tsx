import { lazy } from 'react';
import { Route, Routes } from 'react-router';

import { ROUTES } from '@/constants/routes';
import LoginPage from '@/features/auth/login';
import NotFound from '@/Not-found';

const LazySignUpPage = lazy(() => import('@/features/auth/sign-up'));
const LazyFindPasswordPage = lazy(() => import('@/features/auth/find-password'));

/**
 * @description 인증 관련 라우트(로그인, 회원가입 등)를 정의
 * - 이 라우트들은 PublicRoute 컴포넌트에 의해 제어됩니다.
 */
export default function AuthRoutes() {
  return (
    <Routes>
      {/* 로그인 */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />

      {/* 회원가입 */}
      <Route path={ROUTES.SIGNUP} element={<LazySignUpPage />} />

      {/* 로그인 정보 찾기 */}
      <Route path={ROUTES.FIND}>
        <Route path={ROUTES.PASSWORD} element={<LazyFindPasswordPage />} />
      </Route>

      {/* 잘못된 경로 */}
      <Route path={ROUTES.ALL} element={<NotFound />} />
    </Routes>
  );
}
