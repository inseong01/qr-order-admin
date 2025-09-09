/**
 * @file useOrderTab 커스텀 훅의 단위 테스트입니다.
 * @description 주문 및 주문 항목 데이터를 가져와 탭 상태에 따라 필터링하는 로직을 검증합니다.
 *              - 데이터 로딩, 에러, 빈 상태를 올바르게 반환하는지 확인합니다.
 *              - '미완료', '완료' 탭 상태에 따라 주문 목록을 필터링하는 기능을 검증합니다.
 */
import { useAtomValue } from 'jotai';
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';

import { Order } from '@/lib/supabase/tables/order';
import { OrderItem } from '@/lib/supabase/tables/order-item';

import { useOrderTab } from '../use-order-tab';

// Jotai 모킹
vi.mock('jotai', async (importOriginal) => {
  const original = await importOriginal<typeof import('jotai')>();
  return {
    ...original,
    useAtomValue: vi.fn(),
  };
});

// 쿼리 훅 모킹
vi.mock('@/hooks/use-query/order/query', () => ({
  useQueryAllOrderList: vi.fn(),
  useQueryOrderItems: vi.fn(),
}));

// 모킹된 훅 가져오기
const { useQueryAllOrderList, useQueryOrderItems } = await import('@/hooks/use-query/order/query');

const mockOrders: Order[] = [
  { id: '1', is_done: false, order_number: 1, table: { id: 'T1', number: 1 }, created_at: '', updated_at: null },
  { id: '2', is_done: true, order_number: 2, table: { id: 'T2', number: 2 }, created_at: '', updated_at: null },
  { id: '3', is_done: false, order_number: 3, table: { id: 'T3', number: 3 }, created_at: '', updated_at: null },
];

const mockOrderItems: OrderItem[] = [
  { id: '101', menu: { id: 'M1', name: 'menu 1', price: 100 }, order: mockOrders[0], quantity: 2 },
  { id: '102', menu: { id: 'M2', name: 'menu 2', price: 200 }, order: mockOrders[1], quantity: 1 },
];

describe('useOrderTab', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // 기본 쿼리 반환값 설정
    (useQueryAllOrderList as Mock).mockReturnValue({ data: mockOrders, isLoading: false, isError: false });
    (useQueryOrderItems as Mock).mockReturnValue({ data: mockOrderItems, isLoading: false, isError: false });
  });

  it('로딩 시, isLoading 상태가 true여야 한다', () => {
    (useQueryAllOrderList as Mock).mockReturnValue({ data: [], isLoading: true, isError: false });
    (useAtomValue as Mock).mockReturnValue(0);

    const { result } = renderHook(() => useOrderTab());

    expect(result.current.isLoading).toBe(true);
  });

  it('에러 시, isError 상태가 true여야 한다', () => {
    (useQueryAllOrderList as Mock).mockReturnValue({ data: [], isLoading: false, isError: true });
    (useAtomValue as Mock).mockReturnValue(0);

    const { result } = renderHook(() => useOrderTab());

    expect(result.current.isError).toBe(true);
  });

  it('데이터가 없을 때, isEmpty 상태가 true여야 한다', () => {
    (useQueryAllOrderList as Mock).mockReturnValue({ data: [], isLoading: false, isError: false });
    (useAtomValue as Mock).mockReturnValue(0);

    const { result } = renderHook(() => useOrderTab());

    expect(result.current.isEmpty).toBe(true);
  });

  it('미완료 탭일 때, 처리되지 않은 주문만 반환해야 한다', () => {
    (useAtomValue as Mock).mockReturnValue(0); // 미완료 탭

    const { result } = renderHook(() => useOrderTab());

    const notProcessedOrders = mockOrders.filter((o) => !o.is_done);
    expect(result.current.orders).toEqual(notProcessedOrders);
    expect(result.current.orders.length).toBe(2);
    expect(result.current.isEmpty).toBe(false);
  });

  it('완료 탭일 때, 처리된 주문만 반환해야 한다', () => {
    (useAtomValue as Mock).mockReturnValue(1); // 완료 탭

    const { result } = renderHook(() => useOrderTab());

    const processedOrders = mockOrders.filter((o) => o.is_done);
    expect(result.current.orders).toEqual(processedOrders);
    expect(result.current.orders.length).toBe(1);
    expect(result.current.isEmpty).toBe(false);
  });

  it('모든 데이터가 성공적으로 로드되었을 때, 올바른 상태를 반환해야 한다', () => {
    (useAtomValue as Mock).mockReturnValue(0);

    const { result } = renderHook(() => useOrderTab());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.isEmpty).toBe(false);
    expect(result.current.orderItems).toEqual(mockOrderItems);
  });
});
