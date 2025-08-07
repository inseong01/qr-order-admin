import { Route, Routes } from 'react-router';

import { ROUTES } from '@/constants/routes';
import ResetPasswordPage from '@/features/auth/reset-password';
import FindPasswordPage from '@/features/auth/find-password';
import LoginPage from '@/features/auth/login';
import SignUpPage from '@/features/auth/sign-up';
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
        <Route path={ROUTES.PASSWORD} element={<FindPasswordPage />} />
      </Route>

      {/* 비밀번호 수정 */}
      <Route path={ROUTES.RESET}>
        <Route path={ROUTES.PASSWORD} element={<ResetPasswordPage />} />
      </Route>

      {/* 잘못된 경로 */}
      <Route path={ROUTES.ALL} element={<NotFound />} />
    </Routes>
  );
}
