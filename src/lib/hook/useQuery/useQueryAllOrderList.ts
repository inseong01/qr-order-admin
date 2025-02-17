import getOrderList from '../../supabase/func/getOrderList';

import { useQuery } from '@tanstack/react-query';

export default function useQueryAllOrderList() {
  const allOrderList = useQuery({
    queryKey: ['allOrderList'],
    queryFn: () => getOrderList(),
    staleTime: Infinity,
  });

  return allOrderList;
}
