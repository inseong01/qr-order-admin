/**
 * @file 주문 카드 레이아웃 관련 findOrderStartAt 함수 단위 테스트
 * @description 주문 데이터 기반 특정 주문 시작 시각 반환을 검증합니다
 */
import { describe, expect, it } from 'vitest';
import { findOrderStartAt } from '../find-order';

import mock_orders from '@/mock/order.test.json';
import mock_order_items from '@/mock/order-item.test.json';

describe('generate card 함수 테스트', () => {
  describe('findOrderStartAt', () => {
    it('첫 번째 주문 시작 시각 반환', () => {
      const startAt = findOrderStartAt({ orders: mock_orders, orderId: mock_order_items[0].id });
      expect(startAt).toBe('2025-07-30T10:00:00.000Z');
    });

    it('두 번째 주문 시작 시각 반환', () => {
      const startAt = findOrderStartAt({ orders: mock_orders, orderId: mock_order_items[1].id });
      expect(startAt).toBe('2025-07-30T10:10:00.000Z');
    });
  });
});
