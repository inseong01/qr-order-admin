import { useAtomValue } from 'jotai';
import Konva from 'konva';

import { editModeAtom, selectedTableIdsAtom } from '../store/table-edit-state';

export default function useOnMouseCursor(stageRef: Konva.Stage | null, tableId: string) {
  const selectTableIds = useAtomValue(selectedTableIdsAtom);
  const editMode = useAtomValue(editModeAtom);

  // leave
  function setDefaultCursor() {
    if (!stageRef) return;
    stageRef.container().style.cursor = 'default';
  }

  // in
  function changeCursor() {
    if (!stageRef) return;

    const container = stageRef.container();
    const isClickedTable = tableId === selectTableIds[0];

    if (!editMode) {
      container.style.cursor = 'pointer';
      return;
    }

    if (editMode === 'delete') {
      container.style.cursor = 'pointer';
      return;
    }

    if (editMode === 'create') {
      container.style.cursor = isClickedTable ? 'move' : 'default';
      return;
    }

    container.style.cursor = isClickedTable ? 'move' : 'pointer';
  }

  return { setDefaultCursor, changeCursor };
}
