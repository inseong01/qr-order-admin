import { useAtomValue } from 'jotai';

import { useQueryTableList } from '@/hooks/use-query/query';
import { draftTablesAtom } from '../store/table-edit-state';

/**
 * 좌석 목록 쿼리 반환 훅
 */
export function useTableTab() {
  const tablesQuery = useQueryTableList();
  const draftTables = useAtomValue(draftTablesAtom);

  /* isLoading */
  const isLoading = tablesQuery.isLoading;

  /* isEmpty */
  const hasQueryData = Array.isArray(tablesQuery.data) && tablesQuery.data.length;
  // 데이터가 없거나 추가 중인 테이블 목록도 없을 때 빈 상태로 처리
  const isEmpty = !hasQueryData && !draftTables.length;

  /* isError */
  const isError = tablesQuery.isError;

  return { tables: tablesQuery.data, isLoading, isEmpty, isError };
}
