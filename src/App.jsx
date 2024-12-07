import './App.css';
import PageWrap from './components/PageWrap';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <PageWrap />
    </QueryClientProvider>
  );
}

export default App;
