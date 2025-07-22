import { atom } from 'jotai';

import { Table } from '@/lib/supabase/tables/table';

type EditMode = '' | 'create' | 'update' | 'delete';

/**
 * 편집 모드 상태
 */
export const editModeAtom = atom<EditMode>('');

/**
 * 편집 중인 테이블 데이터 (사본)
 */
export const draftTablesAtom = atom<Table[]>([]);

/**
 * 선택/작업 중인 테이블 ID 목록
 */
export const selectedTableIdsAtom = atom<string[]>([]);

/**
 * 편집 중인지 여부
 */
export const isEditingAtom = atom(false);

/**
 * 편집 상태 초기화
 */
export const resetTablEditAtom = atom(null, (_, set) => {
  set(editModeAtom, '');
  set(draftTablesAtom, []);
  set(selectedTableIdsAtom, []);
  set(isEditingAtom, false);
});

/**
 * 편집 모드 지정
 */
export const setEditModeAtom = atom(null, (_, set, mode: EditMode) => {
  set(editModeAtom, mode);
});

/**
 * 편집 모드 토글
 */
export const toggleEditModeAtom = atom(null, (get, set) => {
  const current = get(isEditingAtom);
  set(isEditingAtom, !current);
});

/**
 * 테이블 선택/해제
 */
export const selectTableAtom = atom(null, (get, set, tableId: string) => {
  const currentIds = get(selectedTableIdsAtom);
  const newIds = new Set(currentIds);

  if (newIds.has(tableId)) {
    newIds.delete(tableId); // 이미 있으면 제거
  } else {
    newIds.add(tableId); // 없으면 추가
  }

  set(selectedTableIdsAtom, [...newIds]);
});

/**
 * 새로운 테이블 사본 추가
 */
export const createDraftTableAtom = atom(null, (get, set, newTable: Table) => {
  const currentTables = get(draftTablesAtom);
  set(draftTablesAtom, [...currentTables, newTable]);
  set(selectedTableIdsAtom, [newTable.id]);
});

/**
 * 테이블 데이터 사본 설정
 */
export const setDraftTableAtom = atom(null, (get, set, newTables: Table[]) => {
  set(draftTablesAtom, [...newTables]);
});

/**
 * 사본 테이블 데이터 업데이트
 */
export const updateDraftTableAtom = atom(null, (get, set, updatedTable: Table) => {
  const currentTables = get(draftTablesAtom);
  const newTables = currentTables.map((table) => (table.id === updatedTable.id ? updatedTable : table));
  set(draftTablesAtom, newTables);
});
