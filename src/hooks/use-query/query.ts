import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getTableList, Table } from '@/lib/supabase/function/table';
import { getRequestList, Request } from '@/lib/supabase/function/request';
import { getMenuList, Menu } from '@/lib/supabase/function/menu';
import { getOrderList, Order } from '@/lib/supabase/function/order';
import { FirstRequestItem, getRequestItemList } from '@/lib/supabase/function/request-item';
import { getOrderItemList, OrderItem } from '@/lib/supabase/function/order-item';

/**
 * 테이블 목록을 가져오는 쿼리
 */
export function useQueryTableList() {
  const tableList = useQuery<Table[]>({
    queryKey: ['tableList'],
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
    queryKey: ['requestList'],
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
    queryKey: ['firstRequest'],
    queryFn: () => getRequestItemList(request_id),
    refetchOnWindowFocus: false,
  });

  const refetch = async () => await queryClient.refetchQueries({ queryKey: ['firstRequest'] });

  return { data, isFetching, refetch };
}

/**
 * 메뉴 목록을 가져오는 쿼리
 */
export function useQueryMenuList() {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery<Menu[]>({
    queryKey: ['menuList'],
    queryFn: getMenuList,
    staleTime: Infinity,
  });

  const refetch = async () => await queryClient.refetchQueries({ queryKey: ['menuList'] });

  return { data, refetch, isFetching };
}

/**
 * 전체 주문 목록을 가져오는 쿼리
 */
export function useQueryAllOrderList() {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery<Order[]>({
    queryKey: ['allOrderList'],
    queryFn: getOrderList,
  });

  const refetch = async () => await queryClient.refetchQueries({ queryKey: ['allOrderList'] });

  return { data, fetchAmount: isFetching ? 1 : 0, refetch };
}

/**
 * 주문 목록을 가져오는 쿼리
 */
export function useQueryOrderList() {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery<OrderItem[]>({
    queryKey: ['orderList'],
    queryFn: getOrderItemList,
  });

  const refetch = async () => await queryClient.refetchQueries({ queryKey: ['orderList'] });

  return { data, fetchAmount: isFetching ? 1 : 0, refetch };
}
