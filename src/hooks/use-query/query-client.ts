import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { REALTIME_LISTEN_TYPES, REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from '@supabase/realtime-js';

import supabase from '@/lib/supabase';

import { allOrderListQueryOptions, requestListQueryOptions, tableListQueryOptions } from './query-options';

export type DataStatus = 'pending' | 'fulfilled' | 'rejected';

/**
 * 구독 처리하는 커스텀 훅
 *
 * - 실시간으로 데이터를 수신 받았을 때 연관된 데이터 리패치 적용
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
          queryClient.invalidateQueries(allOrderListQueryOptions);
          queryClient.invalidateQueries(tableListQueryOptions);
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
          queryClient.invalidateQueries(requestListQueryOptions);
        }
      )
      .subscribe(() => {});

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, method]);
}
