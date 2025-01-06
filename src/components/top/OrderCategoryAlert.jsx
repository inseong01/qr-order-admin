import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

export default function OrderCategoryAlert({ title }) {
  // useQueryClient
  const queryClient = useQueryClient();
  const allOrderList = useMemo(() => queryClient.getQueryData(['allOrderList']), [queryClient]);
  console.log(allOrderList);
  // variant
  const notServedOrder = allOrderList?.filter((list) => !list.isDone).length;

  return <>{title === '접수' && (allOrderList.length ? notServedOrder : 0)}</>;
}
