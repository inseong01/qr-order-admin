import { OrderItem } from '@/lib/supabase/tables/order-item';

/**
 * @description 주문 항목 배열을 받아 주문 ID를 기준으로 그룹화된 Map 생성
 * @param orderItems - 전체 주문 항목 목록
 * @returns 주문 ID가 키, 해당 주문에 속한 주문 항목 배열이 값인 Map 객체
 */
export function buildOrdersMap(orderItems: OrderItem[]): Map<OrderItem['order']['id'], OrderItem[]> {
  const ordersMap = new Map();

  orderItems.forEach((o) => {
    if (ordersMap.has(o.order.id)) {
      ordersMap.get(o.order.id).push(o);
    } else {
      ordersMap.set(o.order.id, [o]);
    }
  });
  return ordersMap;
}
