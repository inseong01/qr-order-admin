import getTableList from '../../supabase/func/getTableList';

import { useQuery } from '@tanstack/react-query';

export default function useQueryTableList() {
  const tableList = useQuery({
    queryKey: ['tableList'],
    queryFn: () => getTableList(),
    staleTime: Infinity,
    throwOnError: true,
  });

  return tableList;
}
