import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getTableList, Table } from '@/lib/supabase/function/table';
import { getRequestList, Request } from '@/lib/supabase/function/request';
import { getMenuList, Menu } from '@/lib/supabase/function/menu';
import { getOrderList, Order } from '@/lib/supabase/function/order';
import { FirstRequestItem, getRequestItemList } from '@/lib/supabase/function/request-item';
import { getOrderItemList, OrderItem } from '@/lib/supabase/function/order-item';

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
  const tableList = useQuery<Table[]>({
    queryKey: TABLE_LIST_QUERY_KEY,
    queryFn: getTableList,
    staleTime: Infinity,
    throwOnError: true,
    refetchOnWindowFocus: false,
  });

  return tableList;
}

/**
 * 요청 목록을 가져오는 쿼리
 */
export function useQueryRequestList() {
  const { data, isFetching } = useQuery<Request[]>({
    queryKey: REQUEST_LIST_QUERY_KEY,
    queryFn: getRequestList,
    refetchOnWindowFocus: false,
  });

  return { data, isFetching };
}

/**
 * 첫번째 요청 목록을 가져오는 쿼리
 */
export function useQueryFirstRequest(request_id: string) {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery<FirstRequestItem[]>({
    queryKey: FIRST_REQUEST_QUERY_KEY,
    queryFn: () => getRequestItemList(request_id),
    refetchOnWindowFocus: false,
  });

  const refetch = async () => await queryClient.refetchQueries({ queryKey: FIRST_REQUEST_QUERY_KEY });

  return { data, isFetching, refetch };
}

/**
 * 메뉴 목록을 가져오는 쿼리
 */
export function useQueryMenuList() {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery<Menu[]>({
    queryKey: MENU_LIST_QUERY_KEY,
    queryFn: getMenuList,
    staleTime: Infinity,
  });

  const refetch = async () => await queryClient.refetchQueries({ queryKey: MENU_LIST_QUERY_KEY });

  return { data, refetch, isFetching };
}

/**
 * 전체 주문 목록을 가져오는 쿼리
 */
export function useQueryAllOrderList() {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery<Order[]>({
    queryKey: ALL_ORDER_LIST_QUERY_KEY,
    queryFn: getOrderList,
  });

  const refetch = async () => await queryClient.refetchQueries({ queryKey: ALL_ORDER_LIST_QUERY_KEY });

  return { data, fetchAmount: isFetching ? 1 : 0, refetch };
}

/**
 * 하나의 주문 목록을 가져오는 쿼리
 */
export function useQueryOrderList() {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery<OrderItem[]>({
    queryKey: ORDER_LIST_QUERY_KEY,
    queryFn: getOrderItemList,
  });

  const refetch = async () => await queryClient.refetchQueries({ queryKey: ORDER_LIST_QUERY_KEY });

  return { data, fetchAmount: isFetching ? 1 : 0, refetch };
}
