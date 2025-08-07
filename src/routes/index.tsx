import { BrowserRouter, Routes, Route } from 'react-router';

import { ROUTES } from '@/constants/routes';
import NotFound from '@/Not-found';
import App from '@/App';
import GlobalSettingsHandler from '@/components/layout/global-settings-handler';

import ProtectedRoute from './protected-route';
import AuthRoutes from './auth-routes';
import PublicRoute from './public-route';

/**
 * @description 전체 라우터 구조를 정의합니다.
 * - 인증이 필요한 경로는 ProtectedRoute로 보호합니다.
 * - 인증이 필요 없는 경로는 PublicRoute로 관리합니다.
 */
export default function RootRouter() {
  return (
    <BrowserRouter>
      {/* 사용자 환경 설정 */}
      <GlobalSettingsHandler />

      <Routes>
        {/* 인증 필요 라우트 */}
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.ROOT} index element={<App />} />
        </Route>

        {/* 인증 불필요 라우트 */}
        <Route element={<PublicRoute />}>
          <Route path={`${ROUTES.AUTH}/*`} element={<AuthRoutes />} />
        </Route>

        {/* 잘못된 경로 */}
        <Route path={ROUTES.ALL} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
