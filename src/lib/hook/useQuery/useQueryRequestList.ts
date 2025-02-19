import { RequestList } from '../../../types/common';

import { useIsFetching, useQueryClient } from '@tanstack/react-query';

export default function useQueryRequestList() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<RequestList[]>(['requestList']);
  const isFetching = useIsFetching({ queryKey: ['requestList'] });

  return { data, isFetching };
}
