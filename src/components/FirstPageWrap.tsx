import { useSubscribeDBTable } from '../lib/hook/useSubscribeDBTable';
import FirstLoading from './FirstLoading';

import { lazy, Suspense, useState } from 'react';
import { REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from '@supabase/supabase-js';

const LazyPageWrap = lazy(() => import('./PageWrap'));

export default function FirstPageWrap() {
  // state
  const [isCompleted, setLoadComplete] = useState(false);
  const [isMounted, setMount] = useState(false);
  // Supabase Realtime 구독
  const { initialLoadstatus, isLoading, isError } = useSubscribeDBTable(
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL
  );
  // variant
  const state = {
    isCompleted,
    isError,
    isLoading,
    isMounted,
    initialLoadstatus,
  };

  return (
    <>
      <FirstLoading state={state} setLoadComplete={setLoadComplete} />
      <Suspense>
        <LazyPageWrap state={state} setMount={setMount} />
      </Suspense>
    </>
  );
}
