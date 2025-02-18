// import getMenuList from '../../supabase/func/getMenuList';
import { useBoundStore } from '../../store/useBoundStore';
import { MenuList } from '../../../types/common';

import { useIsFetching, useQueryClient } from '@tanstack/react-query';

export default function useQueryMenuList() {
  // store
  const selectedCategory = useBoundStore((state) => state.category);
  // useQuery
  // const menuList = useQuery({
  //   queryKey: ['menuList', selectedCategory.id],
  //   queryFn: () => getMenuList(selectedCategory),
  // });

  /*
    useQueryClient 적용
    - useQueryMenuList 옵저버 수 1개 유지
    - useIsFetching()으로 리패칭 시도 1회 추가
    : 그러지 않으면 데이터 미갱신 
  */
  const queryClient = useQueryClient();
  const refetch = async () =>
    await queryClient.refetchQueries({ queryKey: ['menuList', selectedCategory.id] });
  const state = queryClient.getQueryState(['menuList', selectedCategory.id]);
  const data = queryClient.getQueryData(['menuList', selectedCategory.id]) as MenuList[] | undefined;
  const isFetching = useIsFetching();

  return { queryClient, state, data, isFetching, refetch };
}
