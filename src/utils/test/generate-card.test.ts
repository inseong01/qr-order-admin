import { describe, expect, it } from 'vitest';

import {
  buildOrdersMap,
  calculateFooter,
  calculateHeader,
  calculateMain,
  findOrderStartAt,
  generateCardLayoutArr,
} from '../function/generate-card';

import mock_orders from '@/features/tab/order/components/order-cards/card/variants/order-card-table.mock.json';
import mock_order_items from '@/features/tab/order/components/order-cards/card/components/order-card.mock.json';

describe('generate card function test', () => {
  describe('buildOrdersMap ', () => {
    it('전체 주문 order.id 기준 주문 수 일치 확인 ', () => {
      const orderMap = buildOrdersMap(mock_order_items);
      expect(orderMap.values().toArray()).toHaveLength(5);
    });
  });

  describe('findOrderStartAt', () => {
    it('특정 주문 시각 반환 1', () => {
      const startAt = findOrderStartAt({ orders: mock_orders, orderItem: mock_order_items[0] });
      expect(startAt).toBe('2025-07-30T10:00:00.000Z');
    });

    it('특정 주문 시각 반환 2', () => {
      const startAt = findOrderStartAt({ orders: mock_orders, orderItem: mock_order_items[1] });
      expect(startAt).toBe('2025-07-30T10:10:00.000Z');
    });
  });

  describe('calculateHeader', () => {
    it('시작 카드일 때 헤더 높이', () => {
      const headerHeight = calculateHeader(true);
      expect(headerHeight).toBe(160);
    });

    it('시작 카드가 아닐 때 헤더 높이', () => {
      const headerHeight = calculateHeader(false);
      expect(headerHeight).toBe(45);
    });
  });

  describe('calculateMain', () => {
    it('메뉴 하나 있을 때 메인 높이', () => {
      const mainHeight = calculateMain();
      expect(mainHeight).toBe(48);
    });

    it('메뉴 두 개 있을 때 메인 높이', () => {
      const mainHeight = calculateMain() * 2;
      expect(mainHeight).toBe(96);
    });
  });

  describe('calculateFooter', () => {
    it('푸터 높이', () => {
      const footerHeight = calculateFooter();
      expect(footerHeight).toBe(104);
    });
  });

  describe('generateCardLayoutArr', () => {
    it('레이아웃 카드 수 일치 확인', () => {
      const cards = generateCardLayoutArr({ orders: mock_orders, orderItems: mock_order_items, maxHeight: 196 });

      // 768 - 5개
      // 196 - 11개
      console.log(JSON.stringify(cards, null, 2));
      // console.log(cards.length);
    });
  });
});
