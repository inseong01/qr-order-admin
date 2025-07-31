import { useAtomValue } from 'jotai';
import { headerTabIdxAtom } from '@/features/page/header';
import { useQueryAllOrderList } from '@/hooks/use-query/query';

import orderMock from '@/mock/order.test.json';

/**
 * 처리 여부에 따른 주문 목록 반환 함수
 *
 * @returns 처리/미처리 주문 목록
 */
export function useOrderTab() {
  // const ordersQuery = useQueryAllOrderList();
  const ordersQuery = { data: orderMock };
  const categoryKey = useAtomValue(headerTabIdxAtom);
  const isDone = categoryKey === 1;

  const processedOrders = ordersQuery.data?.filter((o) => o.is_done) ?? [];
  const notProcessedOrders = ordersQuery.data?.filter((o) => !o.is_done) ?? [];
  const orders = isDone ? processedOrders : notProcessedOrders;

  return { orders };
}
