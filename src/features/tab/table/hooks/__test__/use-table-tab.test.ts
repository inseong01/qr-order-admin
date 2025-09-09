/**
 * @file useTableTab 커스텀 훅의 단위 테스트입니다.
 * @description react-query의 useQueryTableList와 jotai의 draftTablesAtom 상태를 조합하여
 *              반환되는 isLoading, isEmpty, isError 상태가 올바른지 검증합니다.
 */
import { useAtomValue } from 'jotai';
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';

import { useQueryTableList } from '@/hooks/use-query/table/query';

import { useTableTab } from '../use-table-tab';

// react-query 훅 모킹
vi.mock('@/hooks/use-query/table/query', () => ({
  useQueryTableList: vi.fn(),
}));

// jotai 훅 모킹
vi.mock('jotai', async (importOriginal) => {
  const origin = await importOriginal<typeof import('jotai')>();
  return {
    ...origin,
    useAtomValue: vi.fn(),
  };
});

describe('useTableTab', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('데이터 로딩 중일 때, isLoading이 true여야 한다', () => {
    (useQueryTableList as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    (useAtomValue as Mock).mockReturnValue([]);

    const { result } = renderHook(() => useTableTab());

    expect(result.current.isLoading).toBe(true);
  });

  it('데이터 로딩 성공 시, 테이블 데이터를 반환해야 한다', () => {
    const mockTables = [{ id: '1', name: 'Table 1' }];
    (useQueryTableList as Mock).mockReturnValue({
      data: mockTables,
      isLoading: false,
      isError: false,
    });
    (useAtomValue as Mock).mockReturnValue([]);

    const { result } = renderHook(() => useTableTab());

    expect(result.current.tables).toEqual(mockTables);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isEmpty).toBe(false);
  });

  it('쿼리 데이터와 추가 중인 테이블이 모두 없을 때, isEmpty가 true여야 한다', () => {
    (useQueryTableList as Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });
    (useAtomValue as Mock).mockReturnValue([]);

    const { result } = renderHook(() => useTableTab());

    expect(result.current.isEmpty).toBe(true);
  });

  it('쿼리 데이터는 없지만 추가 중인 테이블이 있을 때, isEmpty가 false여야 한다', () => {
    (useQueryTableList as Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });
    (useAtomValue as Mock).mockReturnValue([{ id: 'draft-1' }]);

    const { result } = renderHook(() => useTableTab());

    expect(result.current.isEmpty).toBe(false);
  });

  it('쿼리 에러 발생 시, isError가 true여야 한다', () => {
    (useQueryTableList as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
    (useAtomValue as Mock).mockReturnValue([]);

    const { result } = renderHook(() => useTableTab());

    expect(result.current.isError).toBe(true);
  });
});
