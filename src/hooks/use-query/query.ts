import { useQuery } from '@tanstack/react-query';

import { getTableList, Table } from '@/lib/supabase/tables/table';
import { getRequestList, Request } from '@/lib/supabase/tables/request';
import { getMenuList, Menu } from '@/lib/supabase/tables/menu';
import { getOrderList, Order } from '@/lib/supabase/tables/order';
import { FirstRequestItem, getRequestItemList } from '@/lib/supabase/tables/request-item';
import { getOrderItems, OrderItem } from '@/lib/supabase/tables/order-item';
import { getMenuCategory, MenuCategory } from '@/lib/supabase/tables/menu-category';

export const TABLE_LIST_QUERY_KEY = ['tableList'];
export const REQUEST_LIST_QUERY_KEY = ['requestList'];
export const FIRST_REQUEST_QUERY_KEY = ['firstRequest'];
export const MENU_LIST_QUERY_KEY = ['menuList'];
export const ALL_ORDER_LIST_QUERY_KEY = ['allOrderList'];
export const ORDER_LIST_QUERY_KEY = ['orderList'];
export const MENU_CATEGORIES_QUERY_KEY = ['menuCategoryList'];

/**
 * 테이블 목록을 가져오는 쿼리
 */
export function useQueryTableList() {
  const query = useQuery<Table[]>({
    queryKey: TABLE_LIST_QUERY_KEY,
    queryFn: getTableList,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry(failureCount) {
      if (import.meta.env.MODE === 'test') return false;
      if (failureCount > 2) return false;
      return true;
    },
  });

  return query;
}

/**
 * 요청 목록을 가져오는 쿼리
 */
export function useQueryRequestList() {
  const { data, refetch } = useQuery<Request[]>({
    queryKey: REQUEST_LIST_QUERY_KEY,
    queryFn: getRequestList,
    refetchOnWindowFocus: false,
    retry(failureCount) {
      if (import.meta.env.MODE === 'test') return false;
      if (failureCount > 2) return false;
      return true;
    },
  });

  return { data, refetch };
}

/**
 * 첫번째 요청 목록을 가져오는 쿼리
 */
export function useQueryFirstRequest(request_id: string) {
  const { data, refetch } = useQuery<FirstRequestItem[]>({
    queryKey: FIRST_REQUEST_QUERY_KEY,
    queryFn: () => getRequestItemList(request_id),
    refetchOnWindowFocus: false,
    retry(failureCount) {
      if (import.meta.env.MODE === 'test') return false;
      if (failureCount > 2) return false;
      return true;
    },
  });

  return { data, refetch };
}

/**
 * 메뉴 목록을 가져오는 쿼리
 */
export function useQueryMenuList() {
  const query = useQuery<Menu[]>({
    queryKey: MENU_LIST_QUERY_KEY,
    queryFn: getMenuList,
    staleTime: Infinity,
    retry(failureCount) {
      if (import.meta.env.MODE === 'test') return false;
      if (failureCount > 2) return false;
      return true;
    },
  });

  return query;
}

/**
 * 전체 주문 목록을 가져오는 쿼리
 */
export function useQueryAllOrderList() {
  const query = useQuery<Order[]>({
    queryKey: ALL_ORDER_LIST_QUERY_KEY,
    queryFn: getOrderList,
    staleTime: 1000 * 60,
    retry(failureCount) {
      if (import.meta.env.MODE === 'test') return false;
      if (failureCount > 2) return false;
      return true;
    },
  });

  return query;
}

/**
 * 전체 주문 메뉴 목록을 가져오는 쿼리
 */
export function useQueryOrderItems() {
  const query = useQuery<OrderItem[]>({
    queryKey: ORDER_LIST_QUERY_KEY,
    queryFn: getOrderItems,
    staleTime: 1000 * 60,
    retry(failureCount) {
      if (import.meta.env.MODE === 'test') return false;
      if (failureCount > 2) return false;
      return true;
    },
  });

  return query;
}

/**
 * 메뉴 카테고리 목록을 가져오는 쿼리
 */
export function useQueryMenuCategoryList() {
  const query = useQuery<MenuCategory[]>({
    queryKey: MENU_CATEGORIES_QUERY_KEY,
    queryFn: getMenuCategory,
    retry(failureCount) {
      if (import.meta.env.MODE === 'test') return false;
      if (failureCount > 2) return false;
      return true;
    },
  });

  return query;
}
