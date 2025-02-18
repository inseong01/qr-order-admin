import supabase from '../supabase/supabaseConfig';
import fetchTableRequestList from '../supabase/func/fetchTableRequestList';
import getOrderList from '../supabase/func/getOrderList';
import getTabCategory from '../supabase/func/getTabCategory';
import getMenuList from '../supabase/func/getMenuList';
import { useBoundStore } from '../store/useBoundStore';

import { useEffect, useState } from 'react';
import { REALTIME_LISTEN_TYPES, REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from '@supabase/supabase-js';
import { useQueries } from '@tanstack/react-query';

// Supabase Table Realtime 구독 커스텀훅

// 최상단 컴포넌트에 커스텀훅 배치, 코드 정리용
// useQuery 리패치 메서드 활용

// 필요한 컴포넌트에서 useQueryClient 활용

// 중요
// - 구독은 한 번만 이루어지도록
// - 업데이트 되면 데이터 갱신되도록, 원본 캐시 useQuery 위치 중요
// - useQuery 커스텀훅 "staleTime: Infinity"로 매번 리렌더링 방지

export function useSubscribeDBTable(method: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL) {
  // state
  const [isFirstLoad, setLoaded] = useState(true);
  // store
  const tab = useBoundStore((state) => state.tab.title);
  const selectedCategory = useBoundStore((state) => state.category);
  // useQueries
  const queries = useQueries({
    queries: [
      {
        queryKey: ['requestList'],
        queryFn: () => fetchTableRequestList('select'),
        staleTime: Infinity,
        retry: 1,
      },
      {
        queryKey: ['allOrderList'],
        queryFn: () => getOrderList(),
        staleTime: Infinity,
        retry: 1,
      },
      {
        queryKey: ['tabMenu'],
        queryFn: () => getTabCategory('tab'),
        staleTime: Infinity,
        retry: 1,
      },
      {
        queryKey: ['categoryList', { tab }],
        queryFn: () => getTabCategory(tab),
        refetchOnWindowFocus: false,
        retry: 1,
      },
      {
        queryKey: ['menuList', selectedCategory.id],
        queryFn: () => getMenuList(selectedCategory),
        retry: 1,
      },
    ],
    combine: (result) => {
      return {
        requestList: result[0],
        allOrderList: result[1],
        tabMenu: result[2],
        categoryList: result[3],
        isError: result.some((data) => data.isError),
        // isLoading, 초기에 탭 변경할 때마다 이뤄지는 게 문제: alertMsg 메뉴 카테고리 변경하면 한 번 더 뜨는 원인
        isLoading: result.some((data) => data.isLoading) && false,
        isFetched: result.every((data) => data.isFetching),
      };
    },
  });
  // realtime 활성화 모든 테이블 이벤트 감지
  useEffect(() => {
    if (!isFirstLoad) return;

    const changes = supabase
      .channel('qr-order-orderList-realtime')
      .on(
        `${REALTIME_LISTEN_TYPES.POSTGRES_CHANGES}`,
        { schema: 'public', event: method, table: 'qr-order-allOrderList' },
        async () => {
          // 주문 요청 시 allOrderList 쿼리 리패치
          queries.allOrderList.refetch();
        }
      )
      .on(
        `${REALTIME_LISTEN_TYPES.POSTGRES_CHANGES}`,
        { schema: 'public', event: method, table: 'qr-order-request-list' },
        async () => {
          // 요청 알림마다 requestList 쿼리 리패치
          queries.requestList.refetch();
        }
      )
      .subscribe();

    setLoaded(false);

    return () => {
      changes.unsubscribe();
    };
  }, []);

  return queries;
}
