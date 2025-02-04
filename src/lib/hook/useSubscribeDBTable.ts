import supabase from '../supabase/supabaseConfig';
import useQueryRequestList from './useQuery/useQueryRequestList';
import useQueryAllOrderList from './useQuery/useQueryAllOrderList';

import { useEffect } from 'react';
import { REALTIME_LISTEN_TYPES, REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from '@supabase/supabase-js';

// Supabase Table Realtime 구독 커스텀훅

// 최상단 컴포넌트에 커스텀훅 배치, 코드 정리용
// useQuery 리패치 메서드 활용

// 필요한 컴포넌트에서 useQueryClient 활용

// 중요
// - 구독은 한 번만 이루어지도록
// - 업데이트 되면 데이터 갱신되도록, 원본 캐시 useQuery 위치 중요
// - useQuery 커스텀훅 "staleTime: Infinity"로 매번 리렌더링 방지

export function useSubscribeDBTable(method: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL) {
  const requestList = useQueryRequestList();
  const allOrderList = useQueryAllOrderList();

  // realtime 활성화 모든 테이블 이벤트 감지
  useEffect(() => {
    const changes = supabase
      .channel('qr-order-orderList-realtime')
      .on(
        `${REALTIME_LISTEN_TYPES.POSTGRES_CHANGES}`,
        { schema: 'public', event: method, table: 'qr-order-allOrderList' },
        async () => {
          // 주문 요청 시 allOrderList 쿼리 리패치
          allOrderList.refetch();
        }
      )
      .on(
        `${REALTIME_LISTEN_TYPES.POSTGRES_CHANGES}`,
        { schema: 'public', event: method, table: 'qr-order-request-list' },
        async () => {
          // 요청 알림마다 requestList 쿼리 리패치
          requestList.refetch();
        }
      )
      .subscribe();

    return () => {
      changes.unsubscribe();
    };
  }, []);

  return;
}
