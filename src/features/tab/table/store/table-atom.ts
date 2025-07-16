import { atom } from 'jotai';

import { Table } from '@/lib/supabase/function/table';
import mockData from '@/mock/table.test.json';
import { Stage } from 'konva/lib/Stage';

interface TableState {
  editMode: '' | 'create' | 'update' | 'delete';
  tables: Table[];
  tableIds: string[]; // 작업 중인 테이블 ID 목록
  stage?: Stage;
  isEditing: boolean;
}

const initTableAtom: TableState = {
  editMode: '',
  tables: mockData,
  tableIds: [],
  stage: undefined,
  isEditing: false,
};

export const tableAtom = atom<TableState>(initTableAtom);

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

export const setTableStageAtom = atom(
  (get) => get(tableAtom),
  (get, set, stage: Stage) => {
    const currentState = get(tableAtom);
    const newState = { ...currentState, stage };
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

export const updateTableAtom = atom(null, (get, set, updatedTable: Table) => {
  const currentTables = get(tableAtom).tables;
  const newTables = currentTables.map((table) => (table.id === updatedTable.id ? updatedTable : table));
  set(tableAtom, (prev: TableState) => ({ ...prev, tables: newTables }));
});

export const resetTablEditAtom = atom(null, (get, set) => {
  const newTables = get(tableAtom).tables;
  set(tableAtom, (prev: TableState) => ({ ...prev, tables: newTables, tableIds: [] }));
});

export const toggleEditModeAtom = atom(null, (_, set) => {
  set(tableAtom, (prev: TableState) => ({ ...prev, isEditing: !prev.isEditing }));
});

export const tableAtomWithReset = atom(null, (_, set) => {
  set(tableAtom, initTableAtom);
});
