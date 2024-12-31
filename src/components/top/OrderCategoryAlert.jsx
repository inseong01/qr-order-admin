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
  // variant
  const notServedOrder = orderList.data.filter((list) => !list.isDone).length;

  return <>{title === '접수' && (orderList.data ? notServedOrder : 0)}</>;
}
