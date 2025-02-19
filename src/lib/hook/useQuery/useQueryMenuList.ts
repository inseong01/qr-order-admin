import { MenuList } from '../../../types/common';

import { useIsFetching, useQueryClient } from '@tanstack/react-query';

export default function useQueryMenuList() {
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
