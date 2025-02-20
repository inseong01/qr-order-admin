import supabase from '../supabase/supabaseConfig';
import getOrderList from '../supabase/func/getOrderList';
import getTabCategory from '../supabase/func/getTabCategory';
import getMenuList from '../supabase/func/getMenuList';
import getRequestList from '../supabase/func/getRequestList';
import { useBoundStore } from '../store/useBoundStore';

import { useEffect } from 'react';
import { REALTIME_LISTEN_TYPES, REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from '@supabase/supabase-js';
import { useQueries } from '@tanstack/react-query';

/*
  Supabase Table Realtime 구독 커스텀훅
  
  코드 정리로 커스텀훅화
  구독, 데이터 전달 목적으로 최상단 컴포넌트에 배치
  useQueries 결과값으로 초기 마운트 UI 설정 중
  
  중요
  - 구독은 한 번만 이루어지도록
  - 업데이트 되면 데이터 갱신되도록, 원본 캐시 useQuery 위치 중요
  - "staleTime: Infinity"로 리렌더링 방지 
*/

export type QueryKeys = 'requestList' | 'allOrderList' | 'tabMenu' | 'categoryList' | 'menuList';
export type Status = 'success' | 'pending' | 'error';
export type InitDataLoadStatus = {
  [key in QueryKeys]?: Status;
};

export function useSubscribeDBTable(method: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL) {
  // store
  const tab = useBoundStore((state) => state.tab.title);
  // useQueries
  const queries = useQueries({
    queries: [
      {
        queryKey: ['requestList'],
        queryFn: getRequestList,
        staleTime: Infinity,
        retry: 2,
      },
      {
        queryKey: ['allOrderList'],
        queryFn: getOrderList,
        staleTime: Infinity,
        retry: 2,
      },
      {
        queryKey: ['tabMenu'],
        queryFn: () => getTabCategory('tab'),
        staleTime: Infinity,
        retry: 2,
      },
      {
        queryKey: ['categoryList', { tab }],
        queryFn: () => getTabCategory(tab),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        retry: 2,
      },
      {
        queryKey: ['menuList'],
        queryFn: getMenuList,
        retry: 2,
      },
    ],
    combine: (result) => {
      const isError = result.some((data) => data.isError);
      const isLoading = result.some((data) => data.isLoading);
      const isFetched = result.every((data) => data.isFetched);
      let initialLoadstatus: Status = 'pending';
      let initDataLoadStatus: InitDataLoadStatus = {};

      // query 별 데이터 패치 상태 객체 생성
      for (let i = 0; i < result.length; i++) {
        // query 추가 시 query 순서에 맞춰 queryKeys에 queryKey 삽입
        let queryKeys: QueryKeys[] = ['requestList', 'allOrderList', 'tabMenu', 'categoryList', 'menuList'];
        initDataLoadStatus = {
          ...initDataLoadStatus,
          [queryKeys[i]]: result[i].status,
        };
      }

      // 모든 데이터 패치 실시간 상태 결과
      if (isError) {
        initialLoadstatus = 'error';
      } else if (isFetched) {
        initialLoadstatus = 'success';
      }

      return {
        requestList: result[0],
        allOrderList: result[1],
        tabMenu: result[2],
        categoryList: result[3],
        menuList: result[4],
        isError,
        isLoading,
        isFetched,
        initialLoadstatus,
        initDataLoadStatus,
      };
    },
  });

  // realtime 활성화 모든 테이블 이벤트 감지
  useEffect(() => {
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

    return () => {
      changes.unsubscribe();
    };
  }, []);

  return queries;
}
