import { useAtomValue } from 'jotai';
import { headerTabIdxAtom } from '@/features/page/header';
import { useQueryAllOrderList } from '@/hooks/use-query/query';

export function useOrderTab() {
  const ordersQuery = useQueryAllOrderList();
  const categoryKey = useAtomValue(headerTabIdxAtom);
  const isDone = categoryKey === 1;

  const processedOrders = ordersQuery.data?.filter((o) => o.is_done) ?? [];
  const notProcessedOrders = ordersQuery.data?.filter((o) => !o.is_done) ?? [];
  const orders = isDone ? processedOrders : notProcessedOrders;

  return { orders, isDone };
}
