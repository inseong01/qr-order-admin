import { useAtomValue } from 'jotai';

import { headerTabAtom } from '@/features/page/header/store/atom';
import { useQueryAllOrderList, useQueryOrderItems } from '@/hooks/use-query/order/query';

// import orderMock from '@/mock/order.test.json';
// import orderItemMock from '@/mock/order-item.test.json';

/**
 * 처리 여부에 따른 주문 목록 쿼리 반환 훅
 */
export function useOrderTab() {
  const ordersQuery = useQueryAllOrderList();
  const orderItemsQuery = useQueryOrderItems();
  // const ordersQuery = { data: orderMock };
  // const orderItemsQuery = { data: orderItemMock };
  const categoryKey = useAtomValue(headerTabAtom);
  const isDone = categoryKey === 1;

  const processedOrders = ordersQuery.data?.filter((o) => o.is_done) ?? [];
  const notProcessedOrders = ordersQuery.data?.filter((o) => !o.is_done) ?? [];

  const orders = isDone ? processedOrders : notProcessedOrders;
  const orderItems = orderItemsQuery.data ?? [];

  /* isLoading */
  const isLoading = ordersQuery.isLoading || orderItemsQuery.isLoading;

  /* isEmpty */
  const isEmpty = orders.length === 0;

  /* isError */
  const isError = ordersQuery.isError || orderItemsQuery.isError;

  return { orders, orderItems, isLoading, isEmpty, isError };
}
