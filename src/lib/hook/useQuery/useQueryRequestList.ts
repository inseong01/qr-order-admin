import { useIsFetching, useQueryClient } from '@tanstack/react-query';

export default function useQueryRequestList() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['requestList']);
  const isFetching = useIsFetching();

  return { data, isFetching };
}
