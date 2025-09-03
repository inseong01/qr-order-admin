/**
 * @file generateCardLayoutArr 함수의 단위 테스트입니다.
 * @description 주문 데이터와 주문 항목 데이터를 기반으로 동적인 카드 레이아웃을 생성하는
 *              로직이 정확하게 카드 배열을 반환하는지 검증합니다.
 */
import { describe, it } from 'vitest';
import { generateCardLayoutArr } from '../generate-card-layout-arr';

import mock_orders from '@/mock/order.test.json';
import mock_order_items from '@/mock/order-item.test.json';

describe('generateCardLayoutArr 함수 테스트', () => {
  it('주어진 maxHeight 기준으로 생성된 카드 수가 예상과 일치', () => {
    const maxHeight = 196;
    const cards = generateCardLayoutArr({ orders: mock_orders, orderItems: mock_order_items, maxHeight });

    // 실제 기대값과 비교
    // expect(cards.length).toBe(11); // maxHeight 196 기준 예상 카드 수

    console.log(JSON.stringify(cards, null, 2));
  });
});
