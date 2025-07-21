import { ReactNode, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useAtomValue, useSetAtom } from 'jotai';

import { setWidgetAtomState, widgetAtom } from '@/store/atom/widget-atom';
import { windowStateAtom } from '@/store/atom/window-atom';
import {
  // resetTablEditAtom,
  createTableAtom,
  setTableAtom,
  tableAtom,
  // toggleEditModeAtom,
  tableAtomWithReset,
} from '@/features/tab/table/store/table-atom';
import { createNewTable } from '@/features/tab/table/components/konva/function/konva';
import { setRequestAlertAtom } from '@/features/alert/request/store/atom';
import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';
import {
  createDraftTableAtom,
  draftTablesAtom,
  editModeAtom,
  isEditingAtom,
  resetTablEditAtom,
  selectedTableIdsAtom,
  setEditModeAtom,
  toggleEditModeAtom,
} from '@/features/tab/table/store/table-edit-state';

import LIGHT_LIST_UP_ICON from '@/assets/icon/light-list-up.svg';
import LIGHT_ADD_LIST_ICON from '@/assets/icon/light-add-list.svg';
import LIGHT_DELETE_ICON from '@/assets/icon/light-delete.svg';
import LIGHT_EDIT_ICON from '@/assets/icon/light-edit.svg';
import LIGHT_BACK_ICON from '@/assets/icon/light-back-icon.svg';
import LIGHT_TABLE_ICON from '@/assets/icon/light-table-icon.svg';
import LIGHT_SAVE_ICON from '@/assets/icon/light-save-icon.svg';

import { AnimatedIconSwitcher, AnimatedTextSwitcher } from './switcher/switcher';
import styles from './index.module.css';

/**
 * 위젯 버튼
 */
export function WidgetIconButton() {
  const { isOpen } = useAtomValue(widgetAtom);
  const setWidgetState = useSetAtom(setWidgetAtomState);

  // 위젯 열기/닫기
  function handleWidgetStatus() {
    setWidgetState({ isOpen: !isOpen });
  }

  return (
    <ListBox key='widgetButton' onClick={handleWidgetStatus} isRow={true} isAnimate={false}>
      <span>{isOpen ? '닫기' : '열기'}</span>

      <div className={styles.openIconBox}>
        <img src={LIGHT_LIST_UP_ICON} alt='widget close icon' data-flip={isOpen} />
      </div>
    </ListBox>
  );
}

/**
 * 메뉴 탭 위젯
 */
export function MenuWidget() {
  const setWidgetState = useSetAtom(setWidgetAtomState);

  function createMenuCategory() {
    setWidgetState({ option: 'create-menu-category' });
  }

  function updateMenuCategory() {
    setWidgetState({ option: 'update-menu-category' });
  }

  function deleteMenuCategory() {
    setWidgetState({ option: 'delete-menu-category' });
  }

  return (
    <DetectAnimation>
      <ListBox key='menuWidget1' onClick={createMenuCategory} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src={LIGHT_ADD_LIST_ICON} alt='icon' />
        </div>

        <span>분류 추가</span>
      </ListBox>

      <ListBox key='menuWidget2' onClick={updateMenuCategory} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src={LIGHT_EDIT_ICON} alt='icon' />
        </div>

        <span>분류 수정</span>
      </ListBox>

      <ListBox key='menuWidget3' onClick={deleteMenuCategory} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src={LIGHT_DELETE_ICON} alt='icon' />
        </div>

        <span>분류 삭제</span>
      </ListBox>
    </DetectAnimation>
  );
}

/**
 * 테이블 탭 위젯
 */
export function TableWidget() {
  const { mainSection } = useAtomValue(windowStateAtom);
  // const { tableIds, isEditing, editMode } = useAtomValue(tableAtom);
  const editMode = useAtomValue(editModeAtom);
  const isEditing = useAtomValue(isEditingAtom);
  const tableIds = useAtomValue(selectedTableIdsAtom);
  const draftTables = useAtomValue(draftTablesAtom);
  const setAlertStatus = useSetAtom(setRequestAlertAtom);
  const setTableEditMode = useSetAtom(setEditModeAtom);
  // const setTableEditMode = useSetAtom(setTableAtom);
  const addNewTable = useSetAtom(createDraftTableAtom);
  // const resetTableEditMode = useSetAtom(resetTablEditAtom);
  const toggleEditMode = useSetAtom(toggleEditModeAtom);
  const resetTableState = useSetAtom(resetTablEditAtom);
  // const resetTableState = useSetAtom(tableAtomWithReset);
  const { showConfirmModal } = useConfirmModal();

  function deleteTable() {
    // ID 선택하면 아이콘 변경
    // 선택된 ID 있을 때 다시 누르면 삭제 모달 띄움
    if (editMode === 'delete' && !!tableIds.length) {
      const title = '테이블을 삭제할까요?';
      const onConfirm = async () => {
        // DB 연동
        alert('제출!');

        // 테이블 상태 관리 초기화
        resetTableState();
        toggleEditMode();
      };

      showConfirmModal({ title, onConfirm });
    }

    setTableEditMode('delete');
    setAlertStatus(false);
  }

  function updateTable() {
    // 테이블 크기 수정하면 아이콘 변경
    // 수정된 테이블 목록 있을 때 다시 누르면 수정 모달 띄움
    if (editMode === 'update' && !!draftTables.length) {
      const title = '테이블을 삭제할까요?';
      const onConfirm = async () => {
        // DB 연동
        alert('제출!');

        // 테이블 상태 관리 초기화
        resetTableState();
        toggleEditMode();
      };

      showConfirmModal({ title, onConfirm });
    }

    setTableEditMode('update');
    setAlertStatus(false);
  }

  function createTable() {
    // 수정된 테이블 목록 있을 때 다시 누르면 생성 모달 띄움
    if (editMode === 'create' && !!draftTables.length) {
      const title = '테이블을 추가할까요?';
      const onConfirm = async () => {
        // DB 연동
        alert('제출!');

        // 테이블 상태 관리 초기화
        resetTableState();
        toggleEditMode();
      };

      showConfirmModal({ title, onConfirm });
    }

    const pseudoStageSize = {
      stageWidth: mainSection.width,
      stageHeight: mainSection.height,
    };
    const newTable = createNewTable(pseudoStageSize, draftTables);
    addNewTable(newTable);
    setTableEditMode('create');
    setAlertStatus(false);
  }

  function handleEditMode() {
    if (editMode) {
      resetTableState();
      return;
    }
    resetTableState();
    toggleEditMode();
  }

  return (
    <DetectAnimation>
      {isEditing && (
        <ListBox key='tableWidget1' onClick={createTable} isRow={false} isAnimate={true}>
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
      )}

      {isEditing && (
        <ListBox key='tableWidget2' onClick={updateTable} isRow={false} isAnimate={true}>
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

      {isEditing && (
        <ListBox key='tableWidget3' onClick={deleteTable} isRow={false} isAnimate={true}>
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
    </DetectAnimation>
  );
}

/* 위젯 항목 스타일링 */
function ListBox({
  isAnimate,
  isRow,
  onClick,
  children,
}: {
  isAnimate: boolean;
  isRow: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <motion.button
      className={styles.listBox}
      data-isrow={isRow}
      onClick={onClick}
      // variants={isAnimate ? childMotion : {}}
    >
      {children}
    </motion.button>
  );
}

/* 자식 애니메이션 적용 */
function DetectAnimation({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className={styles.animateBox}
      initial='notClicked'
      animate='clicked'
      exit='notClicked'
      // variants={parentsMotion}
    >
      {children}
    </motion.div>
  );
}
