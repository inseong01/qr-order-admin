import './App.css';
import FirstPageWrap from './components/FirstPageWrap';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  // query
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FirstPageWrap />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
