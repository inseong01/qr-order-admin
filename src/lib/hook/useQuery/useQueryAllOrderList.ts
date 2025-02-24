import { AllOrderList } from '../../../types/common';

import { useIsFetching, useQueryClient } from '@tanstack/react-query';

export default function useQueryAllOrderList() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<AllOrderList[]>(['allOrderList']);
  const refetch = async () => await queryClient.refetchQueries({ queryKey: ['allOrderList'] });
  const fetchAmount = useIsFetching({ queryKey: ['allOrderList'] });

  return { data, fetchAmount, refetch };
}
