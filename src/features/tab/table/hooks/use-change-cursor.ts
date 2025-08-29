import { useAtomValue } from 'jotai';
import Konva from 'konva';

import { editModeAtom, selectedTableIdsAtom } from '../store/table-edit-state';

export default function useOnMouseChangeCursor(stageRef: Konva.Stage | null, tableId: string) {
  const selectTableIds = useAtomValue(selectedTableIdsAtom);
  const editMode = useAtomValue(editModeAtom);

  // leave
  function changeDefaultCursor() {
    if (!stageRef) return;
    stageRef.container().style.cursor = 'default';
  }

  // in
  function changePointerCursor() {
    if (!stageRef) return;

    const iseditingTable = tableId === selectTableIds[0] && editMode !== 'delete';
    if (iseditingTable) {
      stageRef.container().style.cursor = 'move';
      return;
    }

    stageRef.container().style.cursor = 'pointer';
  }

  return { changeDefaultCursor, changePointerCursor };
}
