import styles from '@/style/Widget.module.css';
import { resetKonvaState } from '../lib/features/konvaState/konvaSlice';
import { resetItemState } from '../lib/features/itemState/itemSlice';
import {
  firstSpanVariant,
  iconBoxVariant,
  lastSpanVariant,
  middleSpanVariant,
} from '../lib/motion/motion_widget';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import WidgetMenu from './widget/WidgetMenu';

export default function Widget() {
  // useState
  const [clicked, setClicked] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isClickEditor, setIsClickEditor] = useState(false);
  // useSelector
  const tab = useSelector((state) => state.tabState.state);
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const editTableType = useSelector((state) => state.konvaState.type);
  // useDispatch
  const dispatch = useDispatch();

  // tab 전환될 때
  useEffect(() => {
    setClicked(false);
  }, [tab]);

  function onClickOpenWidgetList() {
    if (isModalOpen) return;
    // 수정 중 취소하기
    if (editTableType) {
      dispatch(resetItemState());
      dispatch(resetKonvaState());
      setIsEdited(false);
      return;
    }
    setIsClickEditor(false);
    setClicked((prev) => !prev);
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
      <WidgetMenu
        clicked={clicked}
        isEdited={isEdited}
        setIsEdited={setIsEdited}
        isClickEditor={isClickEditor}
        setIsClickEditor={setIsClickEditor}
      />
    </div>
  );
}
