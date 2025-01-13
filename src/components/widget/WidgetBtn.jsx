import styles from '@/style/Widget.module.css';
import {
  firstSpanVariant,
  iconBoxVariant,
  lastSpanVariant,
  middleSpanVariant,
} from '../../lib/motion/motion_widget';
import { changeSubmitStatus } from '../../lib/features/submitState/submitSlice';
import { useBoundStore } from '../../lib/store/useBoundStore';

import { useDispatch } from 'react-redux';
import { motion } from 'motion/react';

export default function WidgetBtn() {
  // useDispatch
  const dispatch = useDispatch();
  // store
  const openCloseWidget = useBoundStore((state) => state.openCloseWidget);
  const setWidgetEditState = useBoundStore((state) => state.setWidgetEditState);
  const isWidgetOpen = useBoundStore((state) => state.widget.isOpen);
  const editTableType = useBoundStore((state) => state.konva.type);
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  const resetItemState = useBoundStore((state) => state.resetItemState);
  const resetKonvaState = useBoundStore((state) => state.resetKonvaState);
  const changeSubmitStatus = useBoundStore((state) => state.changeSubmitStatus);

  // 위젯 열기/닫기
  function onClickOpenWidgetList() {
    if (isModalOpen) return;
    // 수정 중 취소하기
    if (editTableType) {
      resetItemState();
      resetKonvaState();
      setWidgetEditState(false);
      // 데이터 패치 가능하도록 초기 상태로 전환
      // dispatch(changeSubmitStatus({ status: 'initial' }));
      changeSubmitStatus({ status: 'initial' });
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
