import { Order } from '@/lib/supabase/tables/order';
import { CardObj } from './types';

/**
 * @description 새로운 주문 카드 객체를 생성
 * @param isStart - 카드가 주문의 시작 부분인지 여부 (기본값 true)
 * @param order - 카드 생성의 기준이 되는 주문 데이터
 * @returns 생성된 카드 객체
 */
export function createNewCard(isStart: boolean = true, order: Order): CardObj {
  const { is_done, table, order_number, id } = order;

  return {
    isStart,
    isEnd: false,
    isDone: is_done,
    heightType: 'full',
    header: {
      table,
      startAt: '',
      updatedAt: '',
      orderNumber: order_number,
    },
    main: [],
    footer: {
      orderId: id,
    },
  };
}
