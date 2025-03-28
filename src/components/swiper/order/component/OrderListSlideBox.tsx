import styles from '@/style/swiper/order/OrderListSlide.module.css';
import { AllOrderList } from '../../../../types/common';
import { useBoundStore } from '../../../../lib/store/useBoundStore';

import { Dispatch, ReactNode, SetStateAction } from 'react';
import { motion } from 'motion/react';

export default function OrderListSlideBox({
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
  // store
  const categoryId = useBoundStore((state) => state.category.id);
  const submitIsError = useBoundStore((state) => state.submit.isError);
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const isMobile = useBoundStore((state) => state.windowState.isMobile);
  const getListInfo = useBoundStore((state) => state.getListInfo);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const changeSubmitMsgType = useBoundStore((state) => state.changeSubmitMsgType);
  // variant
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
