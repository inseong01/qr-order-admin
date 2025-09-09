import { useSetAtom } from 'jotai';
import { useMutation, useQuery } from '@tanstack/react-query';

import { requestListQueryOptions } from '../query-options';
import { updateRequest } from '@/lib/supabase/tables/request';
import { showToastAtom } from '@/features/alert/toast/store/atom';

/**
 * 요청 목록을 가져오는 쿼리
 */
export function useQueryRequestList() {
  return useQuery(requestListQueryOptions);
}

/**
 * 요청을 읽음 처리하는 쿼리
 */
export function useMutationUpdateRequest() {
  const showToast = useSetAtom(showToastAtom);

  const mutation = useMutation({
    mutationFn: ({ id }: { id: string }) => updateRequest(id),
    onSuccess() {},
    onError(error) {
      console.error(error);
      showToast('요청 처리 과정에서 오류가 발생했습니다.');
    },
  });

  return mutation;
}
