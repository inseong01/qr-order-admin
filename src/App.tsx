import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LoadPage from './features/load/page';
import './App.css';

function App() {
  /** 쿼리 설정 */
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* 메인 */}
      <LoadPage />

      {/* 리액트 쿼리 개발 도구 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
