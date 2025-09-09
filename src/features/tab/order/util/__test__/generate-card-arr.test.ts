/**
 * @file 주문 카드 레이아웃 생성 성능 및 메모리 테스트입니다.
 * @description 대량 주문 데이터를 기반으로 generateCardLayoutArr 함수의
 *              실행 시간과 메모리 사용량을 벤치마크합니다.
 */
import { describe, it } from 'vitest';
import { performance } from 'perf_hooks';

import { Order } from '@/lib/supabase/tables/order';
import { OrderItem } from '@/lib/supabase/tables/order-item';

import { generateCardLayoutArr as optimizedGenerateCardLayoutArr } from '../generate-card-layout-arr';

/**
 * 샘플 주문 데이터와 주문 항목을 생성하는 유틸 함수
 */
function createMockData(orderCount: number, itemsPerOrder: number) {
  const now = new Date().toISOString();

  const orders: Order[] = Array.from({ length: orderCount }, (_, i) => ({
    id: `order-${i}`,
    created_at: now,
    updated_at: null,
    table: { id: `table-${i % 10}`, number: (i % 10) + 1 },
    order_number: i + 1,
    is_done: false,
  }));

  const orderItems: OrderItem[] = orders.flatMap((order) =>
    Array.from({ length: itemsPerOrder }, (_, j) => ({
      id: `order-item-${j}`,
      menu: {
        id: `menu-${j}`,
        name: `menu-name-${j}`,
        price: Math.floor(Math.random() * j * 1000),
      },
      order: { ...order },
      quantity: (j % 5) + 1,
    }))
  );

  return { orders, orderItems };
}

describe('generateCardLayoutArr 성능/메모리 테스트', () => {
  describe('성능 테스트', () => {
    it.skip('대량 데이터 실행 시간 측정', () => {
      const { orders, orderItems } = createMockData(10000, 20);
      const iterations = 5;

      const runBenchmark = (fn: typeof optimizedGenerateCardLayoutArr) => {
        const times: number[] = [];

        for (let i = 0; i < iterations; i++) {
          const t0 = performance.now();
          fn({ orders, orderItems, maxHeight: 600 });
          const t1 = performance.now();
          times.push(t1 - t0);
        }

        return times.reduce((a, b) => a + b, 0) / iterations;
      };

      const optimizedTime = runBenchmark(optimizedGenerateCardLayoutArr);
      console.log(`최적화 평균 실행 시간: ${optimizedTime.toFixed(3)}ms`);
    });
  });

  describe('메모리 사용량 테스트', () => {
    it.skip('대량 데이터 메모리 사용량 측정', () => {
      const { orders, orderItems } = createMockData(10000, 20);
      const iterations = 5;

      const runBenchmark = (
        fn: typeof optimizedGenerateCardLayoutArr,
        orders: Order[],
        orderItems: OrderItem[],
        iterations = 5
      ) => {
        const times: number[] = [];
        const memUsages: number[] = [];

        for (let i = 0; i < iterations; i++) {
          if (global.gc) global.gc();

          const t0 = performance.now();
          const beforeMem = process.memoryUsage().heapUsed;

          fn({ orders, orderItems, maxHeight: 600 });

          if (global.gc) global.gc();

          const t1 = performance.now();
          const afterMem = process.memoryUsage().heapUsed;

          times.push(t1 - t0);
          memUsages.push(afterMem - beforeMem);
        }

        const avgTime = times.reduce((a, b) => a + b, 0) / iterations;
        const avgMemMB = memUsages.reduce((a, b) => a + b, 0) / iterations / 1024 / 1024;

        return { avgTime, avgMemMB };
      };

      const optimizedResult = runBenchmark(optimizedGenerateCardLayoutArr, orders, orderItems, iterations);
      console.log('최적화 평균 실행 시간:', optimizedResult.avgTime.toFixed(2), 'ms');
      console.log('최적화 평균 메모리 사용량 증가:', optimizedResult.avgMemMB.toFixed(2), 'MB');
    });
  });
});
