import { Route, Routes } from 'react-router';

import FindPasswordPage from '@/features/auth/find-password';
import LoginPage from '@/features/auth/login';
import SignUpPage from '@/features/auth/sign-up';
import { ROUTES } from '@/constants/routes';
import NotFound from '@/Not-found';

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
      <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />

      {/* 로그인 정보 찾기 */}
      <Route path={ROUTES.FIND}>
        <Route index element={<NotFound />} />
        <Route path={ROUTES.PASSWORD} element={<FindPasswordPage />} />
      </Route>
    </Routes>
  );
}
