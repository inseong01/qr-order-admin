import { lazy, Suspense } from 'react';
import { REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from '@supabase/realtime-js';

import { useQueryClientTable } from '@/hooks/use-query/query-client';

import LoadingSpinner from '../spinner/spinner-index';

const LazyMainPage = lazy(() => import('../../page'));

export default function LoadPage() {
  const query = useQueryClientTable(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL);

  return (
    <>
      {/* 로드 후 페이지 */}
      <Suspense fallback={<LoadingSpinner />}>
        <LazyMainPage dataState={query.dataStatus} />
      </Suspense>
    </>
  );
}
