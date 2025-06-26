import { motion } from 'motion/react';
import { useQueryClient } from '@tanstack/react-query';

import { useBoundStore } from '../../../../lib/store/use-bound-store';

import styles from './button.module.css';

import { widgetBox, topSpanBar, middleSpanBar, bottomSpanBar } from '../../motion/variants';

export default function WidgetIconButton() {
  const isWidgetOpen = useBoundStore((state) => state.widget.isOpen);
  const editTableType = useBoundStore((state) => state.konva.type);
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  const submitIsError = useBoundStore((state) => state.submit.isError);
  const openCloseWidget = useBoundStore((state) => state.openCloseWidget);
  const setWidgetEditState = useBoundStore((state) => state.setWidgetEditState);
  const resetItemState = useBoundStore((state) => state.resetItemState);
  const resetKonvaState = useBoundStore((state) => state.resetKonvaState);

  const queryClient = useQueryClient();
  const refetch = async () => await queryClient.refetchQueries({ queryKey: ['tableList'] });

  // 위젯 열기/닫기
  function onClickOpenWidgetList() {
    if (submitIsError) return;
    if (isModalOpen) return;
    // 수정 중 취소하기
    if (editTableType) {
      resetItemState();
      resetKonvaState();
      setWidgetEditState(false);
      // 원본 데이터 다시 불러오기
      refetch();
      return;
    }
    openCloseWidget();
  }

  return (
    <div className={styles.widget} onClick={onClickOpenWidgetList}>
      <motion.div
        className={styles.iconBox}
        variants={widgetBox}
        initial={isWidgetOpen ? 'notClicked' : 'notClicked'}
        animate={isWidgetOpen ? 'clicked' : 'notClicked'}
      >
        <motion.span variants={topSpanBar}></motion.span>
        <motion.span variants={middleSpanBar}></motion.span>
        <motion.span variants={bottomSpanBar}></motion.span>
      </motion.div>
    </div>
  );
}
