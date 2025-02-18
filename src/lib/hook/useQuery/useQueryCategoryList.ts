import { useBoundStore } from '../../store/useBoundStore';
import { MenuCategoryList } from '../../../types/common';

import { useQueryClient } from '@tanstack/react-query';

export default function useQueryCategoryList() {
  // store
  const tab = useBoundStore((state) => state.tab.title);
  // query
  const query = useQueryClient();
  const data = query.getQueryData(['categoryList', { tab }]) as MenuCategoryList[];
  const refetch = async () => await query.refetchQueries({ queryKey: ['categoryList', { tab }] });

  return { data, refetch };
}
