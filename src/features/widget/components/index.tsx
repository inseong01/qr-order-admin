import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useAtomValue, useSetAtom } from 'jotai';

import { setWidgetAtomState, widgetAtom } from '@/store/atom/widget-atom';
import { createTableAtom, setTableAtom, tableAtom } from '@/features/tab/table/store/table-atom';
import { createNewTable } from '@/features/tab/table/components/konva/function/konva';
import { StageSize } from '@/features/tab/table/components/konva';
import { requestAlertAtom, setRequestAlertAtom } from '@/features/alert/request/store/atom';

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

      <div className={styles.iconBox}>
        <img src={isOpen ? '' : ''} alt='widget close icon' />
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
          <img src='' alt='icon' />
        </div>

        <span>분류 추가</span>
      </ListBox>

      <ListBox key='menuWidget2' onClick={updateMenuCategory} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src='' alt='icon' />
        </div>

        <span>분류 수정</span>
      </ListBox>

      <ListBox key='menuWidget3' onClick={deleteMenuCategory} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src='' alt='icon' />
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
  const isAlertOn = useAtomValue(requestAlertAtom);
  const setAlertStatus = useSetAtom(setRequestAlertAtom);
  const { tables } = useAtomValue(tableAtom);
  const setTableState = useSetAtom(setTableAtom);
  const addNewTable = useSetAtom(createTableAtom);

  function handleAlert() {
    setAlertStatus(!isAlertOn);
  }

  function deleteTable() {
    setTableState({ editMode: 'delete' });
    // setTableState({ isEditMode: true });
    setAlertStatus(false);
  }

  function updateTable() {
    setTableState({ editMode: 'update' });
    // setTableState({ isEditMode: true });
    setAlertStatus(false);
  }

  function createTable() {
    // NOTE: stageSize를 직접 가져올 수 없으므로, 임시로 window 크기를 사용합니다.
    // 이상적으로는 stageSize도 atom으로 관리하는 것이 좋습니다.
    const pseudoStageSize: StageSize = {
      stageWidth: window.innerWidth,
      stageHeight: window.innerHeight,
    };
    const newTable = createNewTable(pseudoStageSize, tables);
    addNewTable(newTable);
    setTableState({ editMode: 'create' });
    // setTableState({ isEditMode: true });
    setAlertStatus(false);
  }

  return (
    <DetectAnimation>
      <ListBox key='tableWidget1' onClick={handleAlert} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src='' alt='icon' />
        </div>

        <span>알림 {isAlertOn ? '끄기' : '켜기'}</span>
      </ListBox>

      <ListBox key='tableWidget2' onClick={createTable} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src='' alt='icon' />
        </div>

        <span>좌석 생성</span>
      </ListBox>

      <ListBox key='tableWidget3' onClick={updateTable} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src='' alt='icon' />
        </div>

        <span>좌석 수정</span>
      </ListBox>

      <ListBox key='tableWidget4' onClick={deleteTable} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src='' alt='icon' />
        </div>

        <span>좌석 삭제</span>
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
