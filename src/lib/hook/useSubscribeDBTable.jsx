import supabase from '../supabase/supabaseConfig';
import { setAllOrderListTrigger, setTableRequestListTrigger } from '../features/realtimeState/realtimeSlice';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// 상위 컴포넌트
// 상위에 커스텀훅 배치, 재사용 하지 않음, 코드 정리용
// uesQuery, state 트리거 할당
// dispatch로 state 트리거 상태 관리

// 하위 컴포넌트
// 필요한 컴포넌트에서 useQuery, useSelector 선언
// useQuery 캐시 특성 활용

// 전역 상태 관리 dispatch로 트리거 활용
// 중요한 점: 구독은 한 번만 이루어지도록 상위 컴포넌트에 선언

export default function useSubscribeDBTable(method) {
  // useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    const changes = supabase
      .channel('qr-order-orderList-realtime') // realtime 활성화 모든 테이블 이벤트 감지
      .on(
        'postgres_changes',
        { schema: 'public', event: method, table: 'qr-order-allOrderList' },
        (payload) => {
          // dispatch(setAllOrderListTrigger());
          // console.log(payload);
        }
      )
      .on(
        'postgres_changes',
        { schema: 'public', event: method, table: 'qr-order-request-list' },
        (payload) => {
          dispatch(setTableRequestListTrigger());
          // console.log(payload);
        }
      )
      .subscribe();

    return () => {
      changes.unsubscribe();
    };
  }, []);

  return;
}
