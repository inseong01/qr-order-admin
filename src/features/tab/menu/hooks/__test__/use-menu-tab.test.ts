/**
 * @file useMenuTab 커스텀 훅의 단위 테스트입니다.
 * @description 메뉴 및 메뉴 분류 데이터를 가져와 가공하는 로직을 검증합니다.
 *              - 데이터 로딩, 에러, 존재 여부 상태를 올바르게 반환하는지 확인합니다.
 *              - 메뉴 목록을 카테고리별로 그룹화하는 기능을 검증합니다.
 */

import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { MenuCategory } from '@/lib/supabase/tables/menu-category';

import { Menu } from '@/lib/supabase/tables/menu';

import { useMenuTab } from '../use-menu-tab';

// 쿼리 훅 모킹
vi.mock('@/hooks/use-query/menu/query', () => ({
  useQueryMenuList: vi.fn(),
}));
vi.mock('@/hooks/use-query/menu-category/query', () => ({
  useQueryMenuCategoryList: vi.fn(),
}));

// 모킹된 훅 임포트
const { useQueryMenuList } = await import('@/hooks/use-query/menu/query');
const { useQueryMenuCategoryList } = await import('@/hooks/use-query/menu-category/query');

const mockMenuList: Menu[] = [
  {
    id: '1',
    name: '아메리카노',
    price: 3000,
    menu_category: { id: '101', title: '커피' },
    img_url: 'default_img',
    tag: '기본',
  },
  {
    id: '2',
    name: '카페라떼',
    price: 3500,
    menu_category: { id: '101', title: '커피' },
    img_url: 'default_img',
    tag: '기본',
  },
  {
    id: '3',
    name: '레몬에이드',
    price: 4000,
    menu_category: { id: '102', title: '에이드' },
    img_url: 'default_img',
    tag: '기본',
  },
];

const mockMenuCategories: MenuCategory[] = [
  { id: '101', title: '커피' },
  { id: '102', title: '에이드' },
];

describe('useMenuTab', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('로딩 시, isLoading 상태가 true여야 한다', () => {
    (useQueryMenuList as Mock).mockReturnValue({ data: [], isLoading: true, isError: false });
    (useQueryMenuCategoryList as Mock).mockReturnValue({ data: [], isLoading: false, isError: false });

    const { result } = renderHook(() => useMenuTab());

    expect(result.current.isLoading).toBe(true);
  });

  it('메뉴 쿼리 에러 시, isError 상태가 true여야 한다', () => {
    (useQueryMenuList as Mock).mockReturnValue({ data: [], isLoading: false, isError: true });
    (useQueryMenuCategoryList as Mock).mockReturnValue({ data: [], isLoading: false, isError: false });

    const { result } = renderHook(() => useMenuTab());

    expect(result.current.isError).toBe(true);
  });

  it('메뉴 분류 쿼리 에러 시, isError 상태가 true여야 한다', () => {
    (useQueryMenuList as Mock).mockReturnValue({ data: [], isLoading: false, isError: false });
    (useQueryMenuCategoryList as Mock).mockReturnValue({ data: [], isLoading: false, isError: true });

    const { result } = renderHook(() => useMenuTab());

    expect(result.current.isError).toBe(true);
  });

  it('데이터가 없을 때, isExist는 false이고, 그룹과 분류는 빈 배열이어야 한다', () => {
    (useQueryMenuList as Mock).mockReturnValue({ data: [], isLoading: false, isError: false });
    (useQueryMenuCategoryList as Mock).mockReturnValue({ data: [], isLoading: false, isError: false });

    const { result } = renderHook(() => useMenuTab());

    expect(result.current.isExist).toBe(false);
    expect(result.current.menuGroupByCategory).toEqual({});
    expect(result.current.menuCategories).toEqual([]);
  });

  it('데이터가 성공적으로 로드되었을 때, 상태가 올바르게 반환되어야 한다', () => {
    (useQueryMenuList as Mock).mockReturnValue({ data: mockMenuList, isLoading: false, isError: false });
    (useQueryMenuCategoryList as Mock).mockReturnValue({ data: mockMenuCategories, isLoading: false, isError: false });

    const { result } = renderHook(() => useMenuTab());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.isExist).toBe(true);
    expect(result.current.menuCategories).toEqual(mockMenuCategories);
  });

  it('메뉴 목록이 카테고리별로 올바르게 그룹화되어야 한다', () => {
    (useQueryMenuList as Mock).mockReturnValue({ data: mockMenuList, isLoading: false, isError: false });
    (useQueryMenuCategoryList as Mock).mockReturnValue({ data: mockMenuCategories, isLoading: false, isError: false });

    const { result } = renderHook(() => useMenuTab());

    const expectedGroup = {
      커피: [
        {
          id: '1',
          name: '아메리카노',
          price: 3000,
          menu_category: { id: '101', title: '커피' },
          img_url: 'default_img',
          tag: '기본',
        },
        {
          id: '2',
          name: '카페라떼',
          price: 3500,
          menu_category: { id: '101', title: '커피' },
          img_url: 'default_img',
          tag: '기본',
        },
      ],
      에이드: [
        {
          id: '3',
          name: '레몬에이드',
          price: 4000,
          menu_category: { id: '102', title: '에이드' },
          img_url: 'default_img',
          tag: '기본',
        },
      ],
    };

    expect(result.current.menuGroupByCategory).toEqual(expectedGroup);
  });

  it('메뉴는 있지만 메뉴 분류가 없을 때, isExist는 true여야 한다', () => {
    (useQueryMenuList as Mock).mockReturnValue({ data: mockMenuList, isLoading: false, isError: false });
    (useQueryMenuCategoryList as Mock).mockReturnValue({ data: [], isLoading: false, isError: false });

    const { result } = renderHook(() => useMenuTab());

    expect(result.current.isExist).toBe(true);
    expect(result.current.menuCategories).toEqual([]);
  });

  it('메뉴 분류는 있지만 메뉴가 없을 때, isExist는 true여야 한다', () => {
    (useQueryMenuList as Mock).mockReturnValue({ data: [], isLoading: false, isError: false });
    (useQueryMenuCategoryList as Mock).mockReturnValue({ data: mockMenuCategories, isLoading: false, isError: false });

    const { result } = renderHook(() => useMenuTab());

    expect(result.current.isExist).toBe(true);
    expect(result.current.menuGroupByCategory).toEqual({});
  });
});
