import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { motion } from 'motion/react';

import { useBoundStore } from '../../../../../lib/store/use-bound-store';

import { AllOrderList } from '../../../../../types/common';

import styles from './slide-index.module.css';

import OrderListSlideDesktop from './devices/slide-pc';
import OrderListSlideMobile from './devices/slide-mobile';

export default function OrderListSlide({ list }: { list: AllOrderList }) {
  const categoryId = useBoundStore((state) => state.category.id);
  const submitError = useBoundStore((state) => state.submit.isError);
  const submitStatus = useBoundStore((state) => state.submit.status);
  const getSelectedListId = useBoundStore((state) => state.getSelectedListId);

  const [isDragging, setDragState] = useState(false);
  const [isSlideClicked, clickSlide] = useState(false);

  const isMobileSize = window.innerWidth <= 720;

  // 슬라이드 상태 초기화
  useEffect(() => {
    if (submitStatus === 'fulfilled' || submitStatus === 'rejected') {
      clickSlide(false);
    }
  }, [submitStatus]);

  function selectSlide() {
    if (!isMobileSize) return;
    if (isDragging) return;
    if (submitError) return;
    if (categoryId === 0) {
      getSelectedListId({ selectedListId: list.id });
    }

    clickSlide((prev) => !prev);
  }

  return (
    <OrderListSlideBox list={list} setDragState={setDragState}>
      {/* 상단 제목 */}
      <div className={`${styles.topBox} ${categoryId === 1 ? styles.done : ''}`} onClick={selectSlide}>
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
        <OrderListSlideMobile isSlideClicked={isSlideClicked} list={list} />
      )}
    </OrderListSlideBox>
  );
}

function OrderListSlideBox({
  children,
  list,
  setDragState,
}: {
  children: ReactNode;
  list: AllOrderList;
  setDragState: Dispatch<SetStateAction<boolean>>;
}) {
  const categoryId = useBoundStore((state) => state.category.id);
  const submitIsError = useBoundStore((state) => state.submit.isError);
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const isMobile = useBoundStore((state) => state.windowState.isMobile);
  const getListInfo = useBoundStore((state) => state.getListInfo);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const changeSubmitMsgType = useBoundStore((state) => state.changeSubmitMsgType);

  let dragStartPosition = 0;

  function onDragStart(e: PointerEvent) {
    const startPosition = e.x;

    dragStartPosition = startPosition;
    setDragState(true);
  }

  function onDragEnd(e: PointerEvent) {
    e.stopPropagation();
    const dragEndPosition = e.x;
    const dragAmount = dragEndPosition - dragStartPosition;
    const isEnableToModify = Math.abs(dragAmount) >= 150;
    const isEnableModifyCategory = categoryId === 0;
    const modifyType = Math.sign(dragAmount) === -1 ? 'delete' : 'complete';

    if (isSubmit) return;
    if (submitIsError) return;
    if (!isEnableToModify) return;
    if (!isEnableModifyCategory) return;

    changeSubmitMsgType({ msgType: modifyType });
    changeModalState({ type: 'update', isOpen: true });
    getListInfo({ list });
  }

  function onDragTransitionEnd() {
    setDragState(false);
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
