import styles from '@/style/Widget.module.css';
import { resetKonvaState } from '../lib/features/konvaState/konvaSlice';
import { resetItemState } from '../lib/features/itemState/itemSlice';
import {
  firstSpanVariant,
  iconBoxVariant,
  lastSpanVariant,
  middleSpanVariant,
} from '../lib/motion/motion_widget';
import {
  resetWidgetState,
  setWidgetEditState,
  setWidgetState,
} from '../lib/features/widgetState/widgetSlice';
import WidgetMenu from './widget/WidgetMenu';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

export default function Widget() {
  // useSelector
  const tab = useSelector((state) => state.tabState.state);
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const editTableType = useSelector((state) => state.konvaState.type);

  const clicked = useSelector((state) => state.widgetState.isWidgetOpen);

  // useDispatch
  const dispatch = useDispatch();

  // tab 전환될 때
  useEffect(() => {
    dispatch(resetWidgetState());
  }, [tab]);

  function onClickOpenWidgetList() {
    if (isModalOpen) return;
    // 수정 중 취소하기
    if (editTableType) {
      dispatch(resetItemState());
      dispatch(resetKonvaState());
      dispatch(setWidgetEditState({ isEdit: false }));
      return;
    }
    dispatch(setWidgetState({ isOpen: !clicked }));
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.widget} onClick={onClickOpenWidgetList}>
        <motion.div
          className={styles.iconBox}
          variants={iconBoxVariant}
          initial={clicked ? 'notClicked' : 'notClicked'}
          animate={clicked ? 'clicked' : 'notClicked'}
        >
          <motion.span variants={firstSpanVariant}></motion.span>
          <motion.span variants={middleSpanVariant}></motion.span>
          <motion.span variants={lastSpanVariant}></motion.span>
        </motion.div>
      </div>
      <WidgetMenu />
    </div>
  );
}
