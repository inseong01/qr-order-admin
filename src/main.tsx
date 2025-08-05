import App from './App';
import NotFound from './Not-found';
import FindPasswordPage from './features/auth/find-password';
import SignUpPage from './features/auth/sign-up';
import './index.css';
import './styles/fonts.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      {/* 로그인 및 메인 */}
      <Route path='/' element={<App />} />

      {/* 회원가입 */}
      <Route path='/signup' element={<SignUpPage />} />

      {/* 로그인 정보 찾기 */}
      <Route path='/find'>
        <Route index element={<NotFound />} />
        <Route path='password' element={<FindPasswordPage />} />
      </Route>

      {/* 잘못된 경로 */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
