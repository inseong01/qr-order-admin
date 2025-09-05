import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { requestListQueryOptions, firstRequestQueryOptions } from '../query-options';
import { updateRequest } from '@/lib/supabase/tables/request';
import { showToastAtom } from '@/features/alert/toast/store/atom';

/**
 * 요청 목록을 가져오는 쿼리
 */
export function useQueryRequestList() {
  return useQuery(requestListQueryOptions);
}

/**
 * 첫번째 요청 목록을 가져오는 쿼리
 */
export function useQueryFirstRequest(request_id: string) {
  return useQuery(firstRequestQueryOptions(request_id));
}

/**
 * 요청을 읽음 처리하는 쿼리
 */
export function useMutationUpdateRequest() {
  const queryClient = useQueryClient();
  const showToast = useSetAtom(showToastAtom);

  const mutation = useMutation({
    mutationFn: ({ id }: { id: string }) => updateRequest(id),
    onSuccess(_, { id }) {
      const oldData = queryClient.getQueryData(requestListQueryOptions.queryKey) || [];
      const updatedData = oldData.filter((d) => d.id !== id);
      queryClient.setQueryData(requestListQueryOptions.queryKey, updatedData);
    },
    onError() {
      showToast('요청 처리 과정에서 오류가 발생했습니다.');
    },
  });

  return mutation;
}
