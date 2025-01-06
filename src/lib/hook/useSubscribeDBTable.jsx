import supabase from '../supabase/supabaseConfig';

import { useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import fetchTableRequestList from '../supabase/func/fetchTableRequestList';
import fetchOrderList from '../supabase/func/fetchOrderList';

// Supabase Table Realtime 구독 커스텀훅

// 최상단 컴포넌트
// 상단에 커스텀훅 배치, 재사용 하지 않음, 코드 정리용
// useQuery 리패치 메소드 활용

// 하위 컴포넌트
// 필요한 컴포넌트에서 useQuery 캐시 특성 활용

// 중요한 점: 구독은 한 번만 이루어지도록 상위 컴포넌트에 선언 + 의존성에 의한 구독해제 선언

export default function useSubscribeDBTable(method) {
  // useQuery
  const [requestList, allOrderList] = useQueries({
    queries: [
      {
        queryKey: ['requestList'],
        queryFn: () => fetchTableRequestList('select'),
      },
      {
        queryKey: ['allOrderList'],
        queryFn: () => fetchOrderList('select'),
      },
    ],
  });

  // realtime 활성화 모든 테이블 이벤트 감지
  useEffect(() => {
    const changes = supabase
      .channel('qr-order-orderList-realtime')
      .on(
        'postgres_changes',
        { schema: 'public', event: method, table: 'qr-order-allOrderList' },
        async (payload) => {
          // 주문 요청 시 allOrderList 쿼리 리패치
          console.log(payload);
          await allOrderList.refetch();
        }
      )
      .on(
        'postgres_changes',
        { schema: 'public', event: method, table: 'qr-order-request-list' },
        async (payload) => {
          // 요청 알림마다 requestList 쿼리 리패치
          await requestList.refetch();
        }
      )
      .subscribe();

    return () => {
      changes.unsubscribe();
    };
  }, [method, requestList, allOrderList]);

  return;
}
