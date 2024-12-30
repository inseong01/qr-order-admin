import getTabCategory from '@/lib/supabase/func/getTabCategory';
import fetchOrderList from '../../lib/supabase/func/fetchOrderList';
import fetchTableRequestList from '../../lib/supabase/func/fetchTableRequestList';
import TabMenu from './TabMenu';

import { useSelector } from 'react-redux';
import { useQueries } from '@tanstack/react-query';

// DB, footerList 추가 시 tabSlice.js switch case 영문 명 반환 추가
export default function FooterList() {
  // useSelector
  const orderTrigger = useSelector((state) => state.realtimeState.allOrderList.trigger);
  const requestTrigger = useSelector((state) => state.realtimeState.tableRequestList.trigger);
  // useQuery
  const [tabMenu] = useQueries({
    queries: [
      {
        queryKey: ['tabMenu'],
        queryFn: () => getTabCategory('tab'),
        initialData: [],
      },
      {
        queryKey: ['allOrderList', orderTrigger],
        queryFn: () => fetchOrderList('select'),
        initialData: [],
      },
      {
        queryKey: ['requestList', requestTrigger],
        queryFn: () => fetchTableRequestList('select'),
        initialData: [],
      },
    ],
  });

  return (
    <>
      {tabMenu.data.map((list) => {
        return <TabMenu key={list.id} list={list} />;
      })}
    </>
  );
}
