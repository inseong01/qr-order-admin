import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { atom, useAtomValue, useSetAtom } from 'jotai';
// import { useQueryClient } from '@tanstack/react-query';

import { modalAtom, modalStateAtom } from '../../../store/atom/modal-atom';

import styles from './index.module.css';
import { childMotion, parentsMotion } from './motion';

/**
 * 위젯 버튼
 */
export function WidgetIconButton() {
  const modalState = useAtomValue(modalAtom);
  const setWidgetState = useSetAtom(modalStateAtom);

  // const editTableType = useBoundStore((state) => state.konva.type);
  // const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  // const submitIsError = useBoundStore((state) => state.submit.isError);
  // const resetItemState = useBoundStore((state) => state.resetItemState);
  // const resetKonvaState = useBoundStore((state) => state.resetKonvaState);

  // const queryClient = useQueryClient();
  // const refetch = async () => await queryClient.refetchQueries({ queryKey: ['tableList'] });

  // 위젯 열기/닫기
  function handleWidgetStatus() {
    // if (submitIsError) return;
    // if (isModalOpen) return;

    // 수정 중 취소하기
    // if (editTableType) {
    //   resetItemState();
    //   resetKonvaState();
    //   refetch(); // 원본 데이터 다시 불러오기
    //   return;
    // }

    setWidgetState({ isOpen: !modalState.isOpen });
  }

  return (
    <ListBox key='widgetButton' onClick={handleWidgetStatus} isRow={true} isAnimate={false}>
      <span>{modalState.isOpen ? '닫기' : '열기'}</span>

      <div className={styles.iconBox}>
        <img src={modalState.isOpen ? '' : ''} alt='icon' />
      </div>
    </ListBox>
  );
}

/**
 * 메뉴 탭 위젯
 */
export function MenuWidget() {
  function addMenuCategory() {}

  function editMenuCategory() {}

  return (
    <DetectAnimation>
      <ListBox key='menuWidget1' onClick={addMenuCategory} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src='' alt='icon' />
        </div>

        <span>분류 추가</span>
      </ListBox>

      <ListBox key='menuWidget2' onClick={editMenuCategory} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src='' alt='icon' />
        </div>

        <span>분류 수정</span>
      </ListBox>
    </DetectAnimation>
  );
}

export const requestAlertAtom = atom(true);

/**
 * 테이블 탭 위젯
 */
export function TableWidget() {
  const isAlertOn = useAtomValue(requestAlertAtom);
  const setAlertStatus = useSetAtom(requestAlertAtom);

  function handleAlert() {
    setAlertStatus((prev) => !prev);
  }

  function deleteTable() {}

  function editTable() {}

  function createTable() {}

  return (
    <DetectAnimation>
      <ListBox key='tableWidget1' onClick={handleAlert} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src='' alt='icon' />
        </div>

        <span>알림 {isAlertOn ? '끄기' : '켜기'}</span>
      </ListBox>

      <ListBox key='tableWidget2' onClick={deleteTable} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src='' alt='icon' />
        </div>

        <span>좌석 삭제</span>
      </ListBox>

      <ListBox key='tableWidget3' onClick={editTable} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src='' alt='icon' />
        </div>

        <span>좌석 수정</span>
      </ListBox>

      <ListBox key='tableWidget4' onClick={createTable} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src='' alt='icon' />
        </div>

        <span>좌석 생성</span>
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
