import { useEffect } from 'react';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { REALTIME_LISTEN_TYPES, REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from '@supabase/realtime-js';

import supabase from '../../lib/supabase';
import { getMenuList } from '../../lib/supabase/tables/menu';
import { getOrderList } from '../../lib/supabase/tables/order';
import { getRequestList } from '../../lib/supabase/tables/request';
import { getMenuCategory } from '../../lib/supabase/tables/menu-category';
import {
  ALL_ORDER_LIST_QUERY_KEY,
  MENU_CATEGORIES_QUERY_KEY,
  MENU_LIST_QUERY_KEY,
  REQUEST_LIST_QUERY_KEY,
} from './query';

export type DataStatus = 'pending' | 'fulfilled' | 'rejected';

/**
 * 초기 데이터 로드 및 Supabase Realtime 구독을 처리하는 커스텀 훅
 *
 * @description
 * - 앱 초기 실행에 필요한 데이터(요청, 주문, 메뉴, 카테고리)를 TanStack Query의 useQueries를 사용해 병렬로 가져옵니다.
 * - Supabase의 Realtime 기능을 구독하여 'order' 및 'request' 테이블에 변경이 생기면 관련 쿼리를 다시 가져옵니다.
 * - 데이터 로딩 상태를 상세히 추적하여 UI에 피드백을 제공할 수 있도록 'success', 'pending', 'error' 상태를 반환합니다.
 *
 * @param method 실시간으로 감지할 이벤트 타입 (e.g., '*')
 */
export function useQueryClientTable(method: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL) {
  const queryClient = useQueryClient();

  const queries = useQueries({
    queries: [
      {
        queryKey: REQUEST_LIST_QUERY_KEY,
        queryFn: getRequestList,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ALL_ORDER_LIST_QUERY_KEY,
        queryFn: getOrderList,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: MENU_CATEGORIES_QUERY_KEY,
        queryFn: getMenuCategory,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: MENU_LIST_QUERY_KEY,
        queryFn: getMenuList,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
      },
    ],
    combine: (results) => {
      const [requestResult, orderResult, menuCategoryResult, menuResult] = results;

      const isError = results.some((r) => r.isError);
      const isFetched = results.every((r) => r.isFetched);

      const dataStatus: DataStatus = isError ? 'rejected' : isFetched ? 'fulfilled' : 'pending';

      return {
        requestList: requestResult,
        allOrderList: orderResult,
        menuCategoryList: menuCategoryResult,
        menuList: menuResult,
        dataStatus, // 전체 데이터 로드 상태
      };
    },
  });

  // Supabase Realtime 구독 설정
  useEffect(() => {
    const channel = supabase.channel('db-changes');

    channel
      .on(
        REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
        {
          event: method,
          schema: 'public',
          table: 'order', // 'order' 테이블 변경 감지
        },
        () => {
          // 주문 목록 쿼리 무효화 및 재요청
          queryClient.invalidateQueries({ queryKey: ['allOrderList'] });
        }
      )
      .on(
        REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
        {
          event: method,
          schema: 'public',
          table: 'request', // 'request' 테이블 변경 감지
        },
        () => {
          // 요청 목록 쿼리 무효화 및 재요청
          queryClient.invalidateQueries({ queryKey: ['requestList'] });
        }
      )
      .subscribe();

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, method]);

  return queries;
}
