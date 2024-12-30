import fetchOrderList from '../../lib/supabase/func/fetchOrderList';

import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

export default function OrderCategoryAlert({ title }) {
  // useSelector
  const trigger = useSelector((state) => state.realtimeState.allOrderList.trigger);
  // useQuery
  const orderList = useQuery({
    queryKey: ['allOrderList', trigger],
    queryFn: () => fetchOrderList('select'),
    initialData: [],
  });

  return <>{title === '접수' && (orderList.data ? orderList.data.length : 0)}</>;
}
