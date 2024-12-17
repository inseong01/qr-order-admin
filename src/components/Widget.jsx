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
  resetWidgetListState,
  resetWidgetState,
  setWidgetEditState,
  setWidgetState,
} from '../lib/features/widgetState/widgetSlice';
import WidgetMenuWrap from './widget/WidgetOptionWrap';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

export default function Widget() {
  // useRef
  const widgetRef = useRef(null);
  // useSelector
  const tab = useSelector((state) => state.tabState.state);
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const editTableType = useSelector((state) => state.konvaState.type);
  const isTableEditAble = useSelector((state) => state.konvaState.isAble);
  const clicked = useSelector((state) => state.widgetState.isWidgetOpen);
  // useDispatch
  const dispatch = useDispatch();

  // tab 전환될 때
  useEffect(() => {
    dispatch(resetWidgetState());
  }, [tab]);

  // 외부 선택으로 위젯 닫기
  useEffect(() => {
    function onClickWindowToCloseWidget(e) {
      if (isModalOpen) return;
      const isWindowClicked = e.target.offsetParent !== widgetRef.current; // offsetParent = widgetWrap
      if (clicked && isWindowClicked && !isTableEditAble) {
        dispatch(setWidgetState());
      }
    }
    window.addEventListener('click', onClickWindowToCloseWidget);

    return () => window.removeEventListener('click', onClickWindowToCloseWidget);
  }, [clicked, isTableEditAble, isModalOpen]);

  function onClickOpenWidgetList() {
    if (isModalOpen) return;
    // 수정 중 취소하기
    if (editTableType) {
      dispatch(resetItemState());
      dispatch(resetKonvaState());
      dispatch(setWidgetEditState({ isEdit: false }));
      return;
    }
    dispatch(setWidgetState());
  }

  return (
    <div className={styles.widgetWrap} ref={widgetRef}>
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
      <WidgetMenuWrap />
    </div>
  );
}
