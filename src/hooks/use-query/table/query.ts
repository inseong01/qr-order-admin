import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { deleteTable, upsertTable, UpsertTable } from '@/lib/supabase/tables/table';
import { showToastAtom } from '@/features/alert/toast/store/atom';
import { EditMode } from '@/features/tab/table/store/table-edit-state';

import { tableListQueryOptions } from '../query-options';

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
    mutationFn: ({ updatedTables }: { updatedTables: UpsertTable[]; editMode: EditMode }) => upsertTable(updatedTables),
    onSuccess(_, { editMode }) {
      queryClient.invalidateQueries({ queryKey: tableListQueryOptions.queryKey });
      showToast(editMode === 'create' ? '추가되었습니다.' : '수정되었습니다.');
    },
    onError(error) {
      console.error(error);
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
      showToast('삭제되었습니다.');
    },
    onError(error) {
      console.error(error);
      showToast('테이블 처리 과정에서 오류가 발생했습니다.');
    },
  });

  return mutation;
}
