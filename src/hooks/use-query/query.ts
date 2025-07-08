import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getTableList, Table } from '@/lib/supabase/function/table';
import { getRequestList, Request } from '@/lib/supabase/function/request';
import { getMenuList, Menu } from '@/lib/supabase/function/menu';
import { getOrderList, Order } from '@/lib/supabase/function/order';

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

  return { data, isFetching: isFetching };
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

  return { data, refetch, isFetching: isFetching };
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
