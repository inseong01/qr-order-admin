import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { tableListQueryOptions } from '../query-options';
import { deleteTable, upsertTable, UpsertTable } from '@/lib/supabase/tables/table';
import { showToastAtom } from '@/features/alert/toast/store/atom';

/**
 * 테이블 목록을 가져오는 쿼리
 */
export function useQueryTableList() {
  return useQuery(tableListQueryOptions);
}

/**
 * 테이블을 추가/수정하는 쿼리
 *
 * TODO: insert, update 2개로 나누기
 */
export function useMutationUpsertTable() {
  const queryClient = useQueryClient();
  const showToast = useSetAtom(showToastAtom);

  const mutation = useMutation({
    mutationFn: (updatedTables: UpsertTable[]) => upsertTable(updatedTables),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: tableListQueryOptions.queryKey });
    },
    onError() {
      showToast('테이블 처리 과정에서 오류가 발생했습니다.');
    },
  });

  return mutation;
}

/**
 * 테이블을 삭제하는 쿼리
 */
export function useMutationDeleteTable() {
  const queryClient = useQueryClient();
  const showToast = useSetAtom(showToastAtom);

  const mutation = useMutation({
    mutationFn: ({ ids }: { ids: string[] }) => deleteTable(ids),
    onSuccess(_, { ids }) {
      const oldData = queryClient.getQueryData(tableListQueryOptions.queryKey) || [];
      const updatedData = oldData.filter((d) => !ids.includes(d.id));
      queryClient.setQueryData(tableListQueryOptions.queryKey, updatedData);
    },
    onError() {
      showToast('테이블 처리 과정에서 오류가 발생했습니다.');
    },
  });

  return mutation;
}
