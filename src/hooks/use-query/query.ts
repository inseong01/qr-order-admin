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
  const { data, refetch, isLoading } = useQuery<Table[]>({
    queryKey: TABLE_LIST_QUERY_KEY,
    queryFn: getTableList,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return { data, refetch, isLoading };
}

/**
 * 요청 목록을 가져오는 쿼리
 */
export function useQueryRequestList() {
  const { data, refetch } = useQuery<Request[]>({
    queryKey: REQUEST_LIST_QUERY_KEY,
    queryFn: getRequestList,
    refetchOnWindowFocus: false,
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
  });

  return { data, refetch };
}

/**
 * 메뉴 목록을 가져오는 쿼리
 */
export function useQueryMenuList() {
  const { data, refetch, isLoading } = useQuery<Menu[]>({
    queryKey: MENU_LIST_QUERY_KEY,
    queryFn: getMenuList,
    staleTime: Infinity,
  });

  return { data, refetch, isLoading };
}

/**
 * 전체 주문 목록을 가져오는 쿼리
 */
export function useQueryAllOrderList() {
  const { data, refetch, isLoading } = useQuery<Order[]>({
    queryKey: ALL_ORDER_LIST_QUERY_KEY,
    queryFn: getOrderList,
    staleTime: 1000 * 60,
  });

  return { data, refetch, isLoading };
}

/**
 * 전체 주문 메뉴 목록을 가져오는 쿼리
 */
export function useQueryOrderItems() {
  const { data, isLoading } = useQuery<OrderItem[]>({
    queryKey: ORDER_LIST_QUERY_KEY,
    queryFn: getOrderItems,
    staleTime: 1000 * 60,
  });

  return { data, isLoading };
}

/**
 * 메뉴 카테고리 목록을 가져오는 쿼리
 */
export function useQueryMenuCategoryList() {
  const { data, refetch } = useQuery<MenuCategory[]>({
    queryKey: MENU_CATEGORIES_QUERY_KEY,
    queryFn: getMenuCategory,
  });

  return { data, refetch };
}
