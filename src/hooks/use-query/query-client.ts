import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { REALTIME_LISTEN_TYPES, REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from '@supabase/realtime-js';

import supabase from '@/lib/supabase';

import { ALL_ORDER_LIST_QUERY_KEY, REQUEST_LIST_QUERY_KEY } from './query';

export type DataStatus = 'pending' | 'fulfilled' | 'rejected';

/**
 * 구독 처리하는 커스텀 훅
 *
 * -'order' 및 'request' 테이블 변경이 생기면 쿼리 리패치
 */
export function useQueryClientTable(method: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL) {
  const queryClient = useQueryClient();

  // Supabase Realtime 구독 설정
  useEffect(() => {
    const channel = supabase.channel('qr-order-realtime-changes');
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
          queryClient.invalidateQueries({ queryKey: ALL_ORDER_LIST_QUERY_KEY });
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
          queryClient.invalidateQueries({ queryKey: REQUEST_LIST_QUERY_KEY });
        }
      )
      .subscribe(() => {});

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, method]);
}
