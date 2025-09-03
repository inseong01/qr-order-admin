import { scan } from 'react-scan';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

import NotFound from '@/Not-found';
import { ROUTES } from '@/constants/routes';
import LoadingSpinner from '@/features/load/spinner';
import GlobalSettingsHandler from '@/components/layout/global-settings-handler';

import ProtectedRoute from './protected-route';
import AuthRoutes from './auth-routes';
import PublicRoute from './public-route';

if (import.meta.env.DEV) {
  scan({ enabled: true });
}

const LazyApp = lazy(() => import('@/App'));
const LazyUpdatePasswordPage = lazy(() => import('@/features/auth/update-password'));

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

      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* 인증 필요 라우트 */}
          <Route path={ROUTES.ROOT} element={<ProtectedRoute />}>
            {/* 메인 */}
            <Route index element={<LazyApp />} />

            {/* 정보 수정 */}
            <Route path={ROUTES.UPDATE}>
              <Route path={ROUTES.PASSWORD} element={<LazyUpdatePasswordPage />} />
            </Route>
          </Route>

          {/* 인증 불필요 라우트 */}
          <Route element={<PublicRoute />}>
            <Route path={`${ROUTES.AUTH}/*`} element={<AuthRoutes />} />
          </Route>

          {/* 잘못된 경로 */}
          <Route path={ROUTES.ALL} element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
