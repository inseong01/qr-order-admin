import { useIsFetching, useQuery, useQueryClient } from '@tanstack/react-query';

import { getTableList } from '../lib/supabase/function/get-list';

import { AllOrderList, MenuList, RequestList, TabCategoryList } from '../types/common';

export function useQueryTableList() {
  const tableList = useQuery({
    queryKey: ['tableList'],
    queryFn: () => getTableList(),
    staleTime: Infinity,
    throwOnError: true,
  });

  return tableList;
}

export function useQueryTabMenu() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['tabMenu']) as TabCategoryList[] | undefined;
  return data;
}

export function useQueryRequestList() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<RequestList[]>(['requestList']);
  const isFetching = useIsFetching({ queryKey: ['requestList'] });

  return { data, isFetching };
}

export function useQueryMenuList() {
  /*
    useQueryClient 적용
    - useQueryMenuList 옵저버 수 1개 유지
    - useIsFetching()으로 리패칭 시도 1회 추가
    : 적용하지 않으면 갱신되지 않은 데이터로 갱신 
  */
  const queryClient = useQueryClient();
  const refetch = async () => await queryClient.refetchQueries({ queryKey: ['menuList'] });
  const data = queryClient.getQueryData<MenuList[]>(['menuList']);
  const isFetching = useIsFetching({ queryKey: ['menuList'] });

  return { data, refetch, isFetching };
}

export function useQueryAllOrderList() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<AllOrderList[]>(['allOrderList']);
  const refetch = async () => await queryClient.refetchQueries({ queryKey: ['allOrderList'] });
  const fetchAmount = useIsFetching({ queryKey: ['allOrderList'] });

  return { data, fetchAmount, refetch };
}
