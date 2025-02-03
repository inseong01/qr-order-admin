import getTabCategory from '../../supabase/func/getTabCategory';
import { useBoundStore } from '../../store/useBoundStore';

import { useQuery } from '@tanstack/react-query';

export default function useQueryCategoryList() {
  // store
  const tab = useBoundStore((state) => state.tab.title);
  // useQuery
  const categoryList = useQuery({
    queryKey: ['categoryList', { tab }],
    queryFn: () => getTabCategory(tab),
    refetchOnWindowFocus: false,
  });

  return categoryList;
}
