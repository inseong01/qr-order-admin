import { useAtomValue, useSetAtom } from 'jotai';

import { windowStateAtom } from '@/store/window-atom';

import { showToastAtom } from '@/features/alert/toast/store/atom';
import { setRequestAlertAtom } from '@/features/alert/request/store/atom';
import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';
import { createNewTable } from '@/features/tab/table/components/konva/function/konva';
import {
  draftTablesAtom,
  editModeAtom,
  isEditingAtom,
  resetTablEditAtom,
  selectedTableIdsAtom,
  selectSingleTableAtom,
  setDraftTableAtom,
  setEditModeAtom,
  setEditStateAtom,
} from '@/features/tab/table/store/table-edit-state';

import LIGHT_EDIT_ICON from '@/assets/icon/light-edit.svg';
import LIGHT_DELETE_ICON from '@/assets/icon/light-delete.svg';
import LIGHT_SAVE_ICON from '@/assets/icon/light-save-icon.svg';
import LIGHT_BACK_ICON from '@/assets/icon/light-back-icon.svg';
import LIGHT_TABLE_ICON from '@/assets/icon/light-table-icon.svg';
import LIGHT_ADD_LIST_ICON from '@/assets/icon/light-add-list.svg';

import { tableEditRectAtom, tableEditTextAtom } from '@/features/tab/table/store/table-state';

import { useMutationDeleteTable, useMutationUpsertTable, useQueryTableList } from '@/hooks/use-query/table/query';

import styles from './tab.module.css';
import { AnimatedIconSwitcher, AnimatedTextSwitcher, DetectAnimation, ListBox } from '../motion';
import { fadeBackgroundLayer } from '../../util/konva-fade-in';

/**
 * 테이블 탭 위젯
 */
export default function TableWidget() {
  const tablesQuery = useQueryTableList();

  const { mainSection } = useAtomValue(windowStateAtom);
  const editMode = useAtomValue(editModeAtom);
  const isEditing = useAtomValue(isEditingAtom);
  const tableIds = useAtomValue(selectedTableIdsAtom);
  const draftTables = useAtomValue(draftTablesAtom);
  const tableEditRect = useAtomValue(tableEditRectAtom);
  const tableEditText = useAtomValue(tableEditTextAtom);
  const setTableRequestAlert = useSetAtom(setRequestAlertAtom);
  const setTableEditMode = useSetAtom(setEditModeAtom);
  const selectSingleTable = useSetAtom(selectSingleTableAtom);
  const setEditState = useSetAtom(setEditStateAtom);
  const setDraftTables = useSetAtom(setDraftTableAtom);
  const resetTableState = useSetAtom(resetTablEditAtom);
  const showToast = useSetAtom(showToastAtom);

  const { showConfirmModal } = useConfirmModal();
  const mutationDeleteTable = useMutationDeleteTable();
  const mutationUpsertTable = useMutationUpsertTable();

  /** 좌석 삭제 로직 */
  function clickDeleteTable() {
    if (!tableEditRect || !tableEditText) {
      showToast('위젯 오류가 발생했습니다.');
      return;
    }

    if (editMode === 'delete' && !!tableIds.length) {
      const title = '테이블을 삭제할까요?';
      const onConfirm = async () => {
        try {
          await mutationDeleteTable.mutateAsync({ ids: tableIds });
          resetTableState();
          fadeBackgroundLayer(tableEditRect, false).play();
          fadeBackgroundLayer(tableEditText, false).play();
        } catch {}
      };

      showConfirmModal({ title, onConfirm });
      return;
    }

    setTableEditMode('delete');
    setDraftTables(tablesQuery.data ?? []);
    setTableRequestAlert(false);
    fadeBackgroundLayer(tableEditRect, true).play();
    fadeBackgroundLayer(tableEditText, true).play();
  }

  /** 좌석 정보 수정 로직 */
  function clickUpdateTable() {
    if (!tableEditRect || !tableEditText) {
      showToast('위젯 오류가 발생했습니다.');
      return;
    }

    if (editMode === 'update' && !!draftTables.length) {
      const title = '테이블을 수정할까요?';
      const onConfirm = async () => {
        try {
          await mutationUpsertTable.mutateAsync({ updatedTables: draftTables, editMode });
          resetTableState();
          fadeBackgroundLayer(tableEditRect, false).play();
          fadeBackgroundLayer(tableEditText, false).play();
        } catch {}
      };

      showConfirmModal({ title, onConfirm });
      return;
    }

    setTableEditMode('update');
    setDraftTables(tablesQuery.data ?? []);
    setTableRequestAlert(false);
    fadeBackgroundLayer(tableEditRect, true).play();
    fadeBackgroundLayer(tableEditText, true).play();
  }

  /** 좌석 생성 로직 */
  function clickCreateTable() {
    if (!tableEditRect || !tableEditText) {
      showToast('위젯 오류가 발생했습니다.');
      return;
    }

    if (editMode === 'create') {
      const title = '테이블을 추가할까요?';
      const onConfirm = async () => {
        try {
          await mutationUpsertTable.mutateAsync({ updatedTables: draftTables, editMode });
          resetTableState();
          fadeBackgroundLayer(tableEditRect, false).play();
          fadeBackgroundLayer(tableEditText, false).play();
        } catch {}
      };

      showConfirmModal({ title, onConfirm });
      return;
    }

    setTableEditMode('create');
    const pseudoStageSize = {
      stageWidth: mainSection.width,
      stageHeight: mainSection.height,
    };
    const newTable = createNewTable(pseudoStageSize, tablesQuery.data ?? []);
    setDraftTables([...(tablesQuery.data ?? []), newTable]);
    selectSingleTable(newTable.id);
    setTableRequestAlert(false);
    fadeBackgroundLayer(tableEditRect, true).play();
    fadeBackgroundLayer(tableEditText, true).play();
  }

  /** 편집 상태 변경 */
  function handleEditMode() {
    if (!tableEditRect || !tableEditText) {
      showToast('위젯 오류가 발생했습니다.');
      return;
    }

    if (editMode) {
      resetTableState();
      setTableRequestAlert(true);
      fadeBackgroundLayer(tableEditRect, tableEditRect.attrs.opacity === 0).play();
      fadeBackgroundLayer(tableEditText, tableEditText.attrs.opacity === 0).play();
      return;
    }

    setEditState(!isEditing);
  }

  const hasTable = Array.isArray(tablesQuery.data) && tablesQuery.data.length !== 0;

  return (
    <DetectAnimation>
      {isEditing && (
        <ListBox key='tableWidget4' onClick={handleEditMode} isRow={false} isAnimate={true}>
          <div className={styles.iconBox}>
            <AnimatedIconSwitcher
              isSaveMode={isEditing}
              initIconSrc={LIGHT_TABLE_ICON}
              changedIconSrc={LIGHT_BACK_ICON}
              alt='icon'
            />
          </div>

          <div className={styles.textBox}>
            <AnimatedTextSwitcher isSaveMode={isEditing} initText='좌석 편집' changedText='편집 취소' />
          </div>
        </ListBox>
      )}

      <ListBox key='tableWidget1' onClick={clickCreateTable} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <AnimatedIconSwitcher
            isSaveMode={editMode === 'create' && !!draftTables.length}
            initIconSrc={LIGHT_ADD_LIST_ICON}
            changedIconSrc={LIGHT_SAVE_ICON}
            alt='icon'
          />
        </div>

        <div className={styles.textBox}>
          <AnimatedTextSwitcher
            isSaveMode={editMode === 'create' && !!draftTables.length}
            initText='좌석 추가'
            changedText='추가하기'
          />
        </div>
      </ListBox>

      {hasTable && (
        <ListBox key='tableWidget2' onClick={clickUpdateTable} isRow={false} isAnimate={true}>
          <div className={styles.iconBox}>
            <AnimatedIconSwitcher
              isSaveMode={editMode === 'update' && !!draftTables.length}
              initIconSrc={LIGHT_EDIT_ICON}
              changedIconSrc={LIGHT_SAVE_ICON}
              alt='icon'
            />
          </div>
          <div className={styles.textBox}>
            <AnimatedTextSwitcher
              isSaveMode={editMode === 'update' && !!draftTables.length}
              initText='좌석 수정'
              changedText='수정하기'
            />
          </div>
        </ListBox>
      )}

      {hasTable && (
        <ListBox key='tableWidget3' onClick={clickDeleteTable} isRow={false} isAnimate={true}>
          <div className={styles.iconBox}>
            <AnimatedIconSwitcher
              isSaveMode={editMode === 'delete' && !!tableIds.length}
              initIconSrc={LIGHT_DELETE_ICON}
              changedIconSrc={LIGHT_SAVE_ICON}
              alt='icon'
            />
          </div>

          <div className={styles.textBox}>
            <AnimatedTextSwitcher
              isSaveMode={editMode === 'delete' && !!tableIds.length}
              initText='좌석 삭제'
              changedText='삭제하기'
            />
          </div>
        </ListBox>
      )}
    </DetectAnimation>
  );
}
