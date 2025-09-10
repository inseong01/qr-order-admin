/**
 * @file 주문 카드 레이아웃 생성 관련 함수의 단위 테스트입니다.
 * @description 주문 데이터를 기반으로 동적인 카드 UI 레이아웃을 생성하는 로직이
 *              정확하게 계산되고 구성되는지 검증합니다.
 */
import { describe, expect, it } from 'vitest';

import { buildOrdersMap } from '../build-orders-map';

import mock_order_items from '@/mock/order-item.test.json';

describe('generate card function test', () => {
  describe('buildOrdersMap ', () => {
    it('전체 주문 order.id 기준 주문 수 일치 확인 ', () => {
      const orderMap = buildOrdersMap(mock_order_items);
      expect(orderMap.size).toBe(5);
    });
  });
});
