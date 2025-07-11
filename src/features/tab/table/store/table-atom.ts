import { atom } from 'jotai';

import { Table } from '@/lib/supabase/function/table';
import mockData from '@/mock/table.test.json';

interface TableState {
  editMode: '' | 'create' | 'update' | 'delete';
  tables: Table[];
  tableIds: string[]; // 작업 중인 테이블 ID 목록
}

export const tableAtom = atom<TableState>({
  editMode: '',
  tables: mockData,
  tableIds: [],
});

export const setTableAtom = atom(
  (get) => get(tableAtom),
  (get, set, update: Partial<TableState>) => {
    const currentState = get(tableAtom);
    const newState = { ...currentState, ...update };

    // 편집 모드가 종료되면 새로 생성된 테이블 ID 목록 초기화
    if (currentState.editMode && !newState.editMode) {
      newState.tableIds = [];
    }

    set(tableAtom, newState);
  }
);

export const createTableAtom = atom(null, (get, set, newTable: Table) => {
  const currentState = get(tableAtom);
  set(tableAtom, {
    ...currentState,
    tables: [...currentState.tables, newTable],
    tableIds: [newTable.id], // 테이블 ID 추가
  });
});

export const selectTableAtom = atom(null, (get, set, tableId: string) => {
  const currentState = get(tableAtom);
  const updatedTableIds = new Set(currentState.tableIds);

  if (updatedTableIds.has(tableId)) {
    updatedTableIds.delete(tableId); // 이미 있으면 제거
  } else {
    updatedTableIds.add(tableId); // 없으면 추가
  }

  set(tableAtom, {
    ...currentState,
    tableIds: [...updatedTableIds], // 테이블 ID 추가
  });
});
