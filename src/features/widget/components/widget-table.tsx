import { useAtomValue, useSetAtom } from 'jotai';

import { windowStateAtom } from '@/store/atom/window-atom';

import { deleteTable, upsertTable } from '@/lib/supabase/tables/table';

import { createNewTable } from '@/features/tab/table/components/konva/function/konva';
import { setRequestAlertAtom } from '@/features/alert/request/store/atom';
import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';
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
import { openSubmissionStatusAlertAtom } from '@/features/alert/popup/store/atom';

import { useQueryTableList } from '@/hooks/use-query/query';

import LIGHT_ADD_LIST_ICON from '@/assets/icon/light-add-list.svg';
import LIGHT_DELETE_ICON from '@/assets/icon/light-delete.svg';
import LIGHT_EDIT_ICON from '@/assets/icon/light-edit.svg';
import LIGHT_BACK_ICON from '@/assets/icon/light-back-icon.svg';
import LIGHT_TABLE_ICON from '@/assets/icon/light-table-icon.svg';
import LIGHT_SAVE_ICON from '@/assets/icon/light-save-icon.svg';

import { AnimatedIconSwitcher, AnimatedTextSwitcher, DetectAnimation, ListBox } from './motion';
import styles from './components.module.css';

/**
 * 테이블 탭 위젯
 */
export function TableWidget() {
  const tablesQuery = useQueryTableList();
  const { mainSection } = useAtomValue(windowStateAtom);
  const editMode = useAtomValue(editModeAtom);
  const isEditing = useAtomValue(isEditingAtom);
  const tableIds = useAtomValue(selectedTableIdsAtom);
  const draftTables = useAtomValue(draftTablesAtom);
  const setTableRequestAlertStatus = useSetAtom(setRequestAlertAtom);
  const setTableEditMode = useSetAtom(setEditModeAtom);
  const selectSingleTable = useSetAtom(selectSingleTableAtom);
  const setEditState = useSetAtom(setEditStateAtom);
  const setDraftTables = useSetAtom(setDraftTableAtom);
  const resetTableState = useSetAtom(resetTablEditAtom);
  const openSubmissionStatusAlert = useSetAtom(openSubmissionStatusAlertAtom);
  const { showConfirmModal } = useConfirmModal();

  /** 좌석 삭제 로직 */
  function clickDeleteTable() {
    if (editMode === 'delete' && !!tableIds.length) {
      const title = '테이블을 삭제할까요?';
      const onConfirm = async () => {
        try {
          await deleteTable(tableIds);
          resetTableState();
          await tablesQuery.refetch();
          openSubmissionStatusAlert('삭제되었습니다.');
        } catch (err) {
          console.error(err);
          openSubmissionStatusAlert('오류가 발생했습니다.');
        }
      };

      showConfirmModal({ title, onConfirm });
      return;
    }

    setTableEditMode('delete');
    setDraftTables(tablesQuery.data ?? []);
    setEditState(true);
    setTableRequestAlertStatus(false);
  }

  /** 좌석 정보 수정 로직 */
  function clickUpdateTable() {
    if (editMode === 'update' && !!draftTables.length) {
      const title = '테이블을 수정할까요?';
      const onConfirm = async () => {
        try {
          await upsertTable(draftTables);
          resetTableState();
          await tablesQuery.refetch();
          openSubmissionStatusAlert('수정되었습니다.');
        } catch (err) {
          console.error(err);
          openSubmissionStatusAlert('오류가 발생했습니다.');
        }
      };

      showConfirmModal({ title, onConfirm });
      return;
    }

    setTableEditMode('update');
    setDraftTables(tablesQuery.data ?? []);
    setEditState(true);
    setTableRequestAlertStatus(false);
  }

  /** 좌석 생성 로직 */
  function clickCreateTable() {
    if (editMode === 'create') {
      const title = '테이블을 추가할까요?';
      const onConfirm = async () => {
        try {
          await upsertTable(draftTables);
          resetTableState();
          await tablesQuery.refetch();
          openSubmissionStatusAlert('추가되었습니다.');
        } catch (err) {
          console.error(err);
          openSubmissionStatusAlert('오류가 발생했습니다.');
        }
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
    setEditState(true);
    setTableRequestAlertStatus(false);
  }

  /** 편집 상태 변경 */
  function handleEditMode() {
    if (editMode) {
      resetTableState();
      return;
    }
    setEditState(!isEditing);
  }

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
    </DetectAnimation>
  );
}
