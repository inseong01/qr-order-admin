import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { motion } from 'motion/react';

import { useBoundStore } from '../../../../../lib/store/use-bound-store';

import { AllOrderList } from '../../../../../types/common';

import styles from './slide-index.module.css';

import OrderListSlideDesktop from './devices/slide-pc';
import OrderListSlideMobile from './devices/slide-mobile';

export default function OrderListSlide({
  list,
  clickedArr,
  setClickedArr,
}: {
  list: AllOrderList;
  clickedArr: string[];
  setClickedArr: Dispatch<SetStateAction<string[]>>;
}) {
  const categoryId = useBoundStore((state) => state.category.id);
  const submitError = useBoundStore((state) => state.submit.isError);
  const getSelectedListId = useBoundStore((state) => state.getSelectedListId);

  const manageDragging = useState(false);

  const isIdExist = clickedArr.includes(list.id);
  const isMobileSize = window.innerWidth <= 720;

  function onClickOrderList(list: AllOrderList) {
    return () => {
      if (manageDragging[0]) return;
      if (submitError) return;
      if (categoryId === 0) {
        getSelectedListId({ selectedListId: list.id });
      }

      // 선택한 주문 목록 확인
      setClickedArr((prev) => {
        if (isIdExist) {
          return prev.filter((arg) => arg !== list.id);
        }
        return [...prev, list.id];
      });
    };
  }

  return (
    <OrderListSlideBox list={list} clickedArr={clickedArr} manageDragging={manageDragging}>
      {/* 상단 제목 */}
      <div className={`${styles.topBox} ${categoryId === 1 ? styles.done : ''}`} onClick={onClickOrderList(list)}>
        <div className={styles.top}>
          <div className={styles.title}>#{list.orderNum}</div>
          <div className={styles.right}>
            <div className={styles.table}>테이블 {list.tableNum}</div>
          </div>
        </div>
      </div>

      {/* 본문 목록 */}
      {!isMobileSize ? (
        <OrderListSlideDesktop list={list} />
      ) : (
        <OrderListSlideMobile isIdExist={isIdExist} list={list} />
      )}
    </OrderListSlideBox>
  );
}

function OrderListSlideBox({
  children,
  list,
  clickedArr,
  manageDragging,
}: {
  children: ReactNode;
  list: AllOrderList;
  clickedArr: string[];
  manageDragging: [boolean, Dispatch<SetStateAction<boolean>>];
}) {
  const categoryId = useBoundStore((state) => state.category.id);
  const submitIsError = useBoundStore((state) => state.submit.isError);
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const isMobile = useBoundStore((state) => state.windowState.isMobile);
  const getListInfo = useBoundStore((state) => state.getListInfo);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const changeSubmitMsgType = useBoundStore((state) => state.changeSubmitMsgType);

  let dragStartPosition = 0;
  const [_, setDragging] = manageDragging;

  function onDragStart(e: PointerEvent) {
    const startPosition = e.x;

    dragStartPosition = startPosition;
    setDragging(true);
  }

  function onDragEnd(e: PointerEvent) {
    e.stopPropagation();
    const dragEndPosition = e.x;
    const dragAmount = dragEndPosition - dragStartPosition;
    const isEnableToModify = Math.abs(dragAmount) >= 150;
    const isOpenedList = clickedArr.includes(list.id);
    const isEnableModifyCategory = categoryId === 0;
    const modifyType = Math.sign(dragAmount) === -1 ? 'delete' : 'complete';

    if (isSubmit) return;
    if (submitIsError) return;
    if (!isOpenedList) return;
    if (!isEnableToModify) return;
    if (!isEnableModifyCategory) return;

    changeSubmitMsgType({ msgType: modifyType });
    changeModalState({ type: 'update', isOpen: true });
    getListInfo({ list });
  }

  function onDragTransitionEnd() {
    setDragging(false);
  }

  return (
    <motion.li
      className={styles.slide}
      drag={isMobile ? 'x' : false}
      transition={{ duration: 0.5 }}
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragTransitionEnd={onDragTransitionEnd}
    >
      {children}
    </motion.li>
  );
}
