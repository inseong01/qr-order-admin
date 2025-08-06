import { useAtomValue } from 'jotai';

import { headerTabIdxAtom } from '@/features/page/header';
import { useQueryAllOrderList, useQueryOrderItems } from '@/hooks/use-query/query';

// import orderMock from '@/mock/order.test.json';
// import orderItemMock from '@/mock/order-item.test.json';

/**
 * 처리 여부에 따른 주문 목록 반환 함수
 *
 * @returns 처리/미처리 주문과 주문 메뉴 목록
 */
export function useOrderTab() {
  const ordersQuery = useQueryAllOrderList();
  const orderItemsQuery = useQueryOrderItems();
  // const ordersQuery = { data: orderMock };
  // const orderItemsQuery = { data: orderItemMock };
  const categoryKey = useAtomValue(headerTabIdxAtom);
  const isDone = categoryKey === 1;

  const processedOrders = ordersQuery.data?.filter((o) => o.is_done) ?? [];
  const notProcessedOrders = ordersQuery.data?.filter((o) => !o.is_done) ?? [];

  const orders = isDone ? processedOrders : notProcessedOrders;
  const orderItems = orderItemsQuery.data ?? [];
  const isLoading = ordersQuery.isLoading || orderItemsQuery.isLoading;

  return { orders, orderItems, isLoading };
}
