import { FindOrderProps } from './types';

/**
 * @description 주문 항목에 해당하는 주문의 'created_at'(접수) 타임스탬프를 찾아서 반환
 * @param props - 주문 정보
 * @returns 타임스탬프 문자열으로 찾지 못하면 빈 문자열 반환
 */
export function findOrderStartAt({ orders, orderId }: FindOrderProps) {
  return orders.find((o) => o.id === orderId)?.created_at ?? '';
}

/**
 * @description 주문 항목에 해당하는 주문의 'updated_at'(완료 또는 수정) 타임스탬프를 찾아서 반환
 * @param props - 주문 정보
 * @returns 타임스탬프 문자열으로 찾지 못하면 빈 문자열 반환
 */
export function findOrderUpdatedAt({ orders, orderId }: FindOrderProps) {
  return orders.find((o) => o.id === orderId)?.updated_at ?? '';
}
