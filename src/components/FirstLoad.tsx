import { useSubscribeDBTable } from '../lib/hook/useSubscribeDBTable';
import ErrorPage from './ErrorPage';

import { REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from '@supabase/supabase-js';
import { lazy, Suspense, useState } from 'react';

const LazyPageWrap = lazy(() => import('./PageWrap'));

export default function FirstLoad() {
  // Supabase Realtime 구독
  const { isError, isLoading } = useSubscribeDBTable(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL);
  // state
  const [isCompleted, setLoadComplete] = useState(false);

  // 에러
  if (isError) return <ErrorPage />;

  return (
    <>
      {!isCompleted && <h1>시작 로드 컴포넌트</h1>}
      <Suspense>
        <LazyPageWrap isCompleted={isCompleted} setLoadComplete={setLoadComplete} isLoading={isLoading} />
      </Suspense>
    </>
  );
}
