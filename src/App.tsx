import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LoadPage from './features/load/page';

import './App.css';
import LoginPage from './features/auth/login';

function App() {
  const queryClient = new QueryClient();
  const isLogin = false;

  return (
    <QueryClientProvider client={queryClient}>
      {/* 메인 */}
      {isLogin ? <LoadPage /> : <LoginPage />}

      {/* 리액트 쿼리 개발 도구 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
