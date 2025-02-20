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

  return (
    <>
      <FirstLoading
        isMounted={isMounted}
        isCompleted={isCompleted}
        setLoadComplete={setLoadComplete}
        initialLoadstatus={initialLoadstatus}
      />
      <Suspense>
        <LazyPageWrap isError={isError} isLoading={isLoading} isMounted={isMounted} setMount={setMount} />
      </Suspense>
    </>
  );
}
