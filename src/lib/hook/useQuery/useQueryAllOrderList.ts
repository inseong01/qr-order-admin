import { AllOrderList } from '../../../types/common';

import { useIsFetching, useQueryClient } from '@tanstack/react-query';

export default function useQueryAllOrderList() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['allOrderList']) as AllOrderList[];
  const refetch = async () => await queryClient.refetchQueries({ queryKey: ['allOrderList'] });
  const isFetching = useIsFetching();

  return { data, isLoading: 0, isFetching, refetch };
}
