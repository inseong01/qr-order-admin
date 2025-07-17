import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useAtomValue, useSetAtom } from 'jotai';

import { setWidgetAtomState, widgetAtom } from '@/store/atom/widget-atom';
import { windowStateAtom } from '@/store/atom/window-atom';
import {
  resetTablEditAtom,
  createTableAtom,
  setTableAtom,
  tableAtom,
  toggleEditModeAtom,
  tableAtomWithReset,
} from '@/features/tab/table/store/table-atom';
import { createNewTable } from '@/features/tab/table/components/konva/function/konva';
import { requestAlertAtom, setRequestAlertAtom } from '@/features/alert/request/store/atom';

import LIGHT_LIST_UP_ICON from '@/assets/icon/light-list-up.svg';
import LIGHT_ADD_LIST_ICON from '@/assets/icon/light-add-list.svg';
import LIGHT_DELETE_ICON from '@/assets/icon/light-delete.svg';
import LIGHT_EDIT_ICON from '@/assets/icon/light-edit.svg';
import LIGHT_BACK_ICON from '@/assets/icon/light-back-icon.svg';
import LIGHT_TABLE_ICON from '@/assets/icon/light-table-icon.svg';

import { childMotion, parentsMotion } from './motion';
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
  const { tables, tableIds, isEditing } = useAtomValue(tableAtom);
  const setAlertStatus = useSetAtom(setRequestAlertAtom);
  const setTableState = useSetAtom(setTableAtom);
  const addNewTable = useSetAtom(createTableAtom);
  const resetTableEditMode = useSetAtom(resetTablEditAtom);
  const toggleEditMode = useSetAtom(toggleEditModeAtom);
  const resetTableState = useSetAtom(tableAtomWithReset);

  function deleteTable() {
    resetTableEditMode();
    setTableState({ editMode: 'delete' });
    setAlertStatus(false);
  }

  function updateTable() {
    resetTableEditMode();
    setTableState({ editMode: 'update' });
    setAlertStatus(false);
  }

  function createTable() {
    const pseudoStageSize = {
      stageWidth: mainSection.width,
      stageHeight: mainSection.height,
    };
    const newTable = createNewTable(pseudoStageSize, tables);
    addNewTable(newTable);
    setTableState({ editMode: 'create' });
    setAlertStatus(false);
  }

  function saveTableData() {
    if (!tableIds.length) {
      alert('저장할 데이터가 없습니다.');
      return;
    }
    console.log('save!');

    // editMode에 따라 데이터 전달
  }

  function handleEditMode() {
    toggleEditMode();
    if (isEditing) {
      resetTableState();
    }
  }

  return (
    <DetectAnimation>
      {tableIds.length ? (
        <ListBox key='tableWidget0' onClick={saveTableData} isRow={false} isAnimate={true}>
          <div className={styles.iconBox}>
            <img src='' alt='icon' />
          </div>

          <span>저장하기</span>
        </ListBox>
      ) : null}

      {isEditing && (
        <ListBox key='tableWidget1' onClick={createTable} isRow={false} isAnimate={true}>
          <div className={styles.iconBox}>
            <img src={LIGHT_ADD_LIST_ICON} alt='icon' />
          </div>

          <span>좌석 추가</span>
        </ListBox>
      )}

      {isEditing && (
        <ListBox key='tableWidget2' onClick={updateTable} isRow={false} isAnimate={true}>
          <div className={styles.iconBox}>
            <img src={LIGHT_EDIT_ICON} alt='icon' />
          </div>

          <span>좌석 수정</span>
        </ListBox>
      )}

      {isEditing && (
        <ListBox key='tableWidget3' onClick={deleteTable} isRow={false} isAnimate={true}>
          <div className={styles.iconBox}>
            <img src={LIGHT_DELETE_ICON} alt='icon' />
          </div>

          <span>좌석 삭제</span>
        </ListBox>
      )}

      <ListBox key='tableWidget4' onClick={handleEditMode} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src={!isEditing ? LIGHT_TABLE_ICON : LIGHT_BACK_ICON} alt='icon' />
        </div>

        <span>{isEditing ? '편집 취소' : '좌석 편집'}</span>
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
      variants={isAnimate ? childMotion : {}}
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
      variants={parentsMotion}
    >
      {children}
    </motion.div>
  );
}
