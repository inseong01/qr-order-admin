import { describe, expect, it } from 'vitest';

import { generateCardLayoutArr } from '../function/generate-card';

import mock_orders from '@/features/tab/order/components/order-cards/card/variants/order-card-table.mock.json';
import mock_order_items from '@/features/tab/order/components/order-cards/card/components/order-card.mock.json';

describe('generate card function test', () => {
  it('레이아웃 확인', () => {
    const cards = generateCardLayoutArr({ order: mock_orders, orderItems: mock_order_items, maxHeight: 120 });

    console.log(cards);
  });
});
