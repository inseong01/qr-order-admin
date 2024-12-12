import supabase from '../supabase/supabaseConfig';

import { useEffect, useState } from 'react';

export default function useGetRealtimeData(method, table) {
  const [data, getData] = useState([]);

  useEffect(() => {
    const changes = supabase
      .channel('qr-order-server-realtime') // realTime 활성화 모든 테이블 이벤트 감지
      .on(
        'postgres_changes',
        // { schema: 'public', event: 'insert', table: 'qr-order-request-list' },
        { schema: 'public', event: '*', filter: 'isRead=eq.false' },
        (payload) => {
          console.log('*', payload);
          getData(payload);
        }
      )
      // .on(
      //   'postgres_changes',
      //   { schema: 'public', event: 'update' },
      //   (payload) => console.log('update', payload))
      .subscribe();
    console.log('qr-order-server-realtime subscribe');
    return () => {
      changes.unsubscribe();
      console.log('qr-order-server-realtime unsubscribe');
    };
  }, []);
  return { data };
}
