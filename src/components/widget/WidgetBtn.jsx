import styles from '@/style/Widget.module.css';
import {
  firstSpanVariant,
  iconBoxVariant,
  lastSpanVariant,
  middleSpanVariant,
} from '../../lib/motion/motion_widget';
import { resetItemState } from '../../lib/features/itemState/itemSlice';
import { resetKonvaState } from '../../lib/features/konvaState/konvaSlice';
import { changeSubmitStatus } from '../../lib/features/submitState/submitSlice';
import { useBoundStore } from '../../lib/store/useBoundStore';

import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react';

export default function WidgetBtn() {
  // useSelector
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const editTableType = useSelector((state) => state.konvaState.type);
  // useDispatch
  const dispatch = useDispatch();
  // hook
  const openCloseWidget = useBoundStore((state) => state.openCloseWidget);
  const setWidgetEditState = useBoundStore((state) => state.setWidgetEditState);
  const isWidgetOpen = useBoundStore((state) => state.widget.isOpen);

  // 위젯 열기/닫기
  function onClickOpenWidgetList() {
    if (isModalOpen) return;
    // 수정 중 취소하기
    if (editTableType) {
      dispatch(resetItemState());
      dispatch(resetKonvaState());
      setWidgetEditState(false);
      // 데이터 패치 가능하도록 초기 상태로 전환
      dispatch(changeSubmitStatus({ status: 'initial' }));
      return;
    }
    openCloseWidget();
  }

  return (
    <div className={styles.widget} onClick={onClickOpenWidgetList}>
      <motion.div
        className={styles.iconBox}
        variants={iconBoxVariant}
        initial={isWidgetOpen ? 'notClicked' : 'notClicked'}
        animate={isWidgetOpen ? 'clicked' : 'notClicked'}
      >
        <motion.span variants={firstSpanVariant}></motion.span>
        <motion.span variants={middleSpanVariant}></motion.span>
        <motion.span variants={lastSpanVariant}></motion.span>
      </motion.div>
    </div>
  );
}
