import styles from '@/style/bottom/TabMenu.module.css';
import { useBoundStore } from '../../lib/store/useBoundStore';
import { TabCategoryList } from '../../types/common';
import UnderLine from '../UnderLine';
import TabMenuTableAlert from './TabMenuTableAlert';
import TabMenuOrderAlert from './TabMenuOrderAlert';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

function TabMenuBoxComponent({ children, tab }: { children: ReactNode; tab: TabCategoryList }) {
  // store
  const currentTabId = useBoundStore((state) => state.tab.id);
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  const isTableEditAble = useBoundStore((state) => state.konva.isAble);
  const submitIsError = useBoundStore((state) => state.submit.isError);
  const changeTabState = useBoundStore((state) => state.changeTabState);
  const resetCategoryState = useBoundStore((state) => state.resetCategoryState);
  const resetItemState = useBoundStore((state) => state.resetItemState);
  const resetSubmitState = useBoundStore((state) => state.resetSubmitState);

  function onClickChangeTab({ id }: TabCategoryList) {
    return () => {
      if (isModalOpen) return;
      if (currentTabId === id) return;
      // 수정 중 tab 이동 임시 제한
      if (isTableEditAble) {
        alert('위젯을 닫고 클릭해주세요');
        return;
      }
      changeTabState({ tabId: id });
      resetCategoryState();
      resetItemState();
      // 탭 변경마다 제출 상태 초기화, 에러 상황 예외
      if (submitIsError) return;
      resetSubmitState();
    };
  }

  return (
    <div
      className={`${styles.listBox} ${currentTabId === tab.id ? styles.clicked : ''}`}
      onClick={onClickChangeTab(tab)}
    >
      {children}
      <UnderLine tab={tab} selectedId={currentTabId} position={'top'} />
    </div>
  );
}

export default function TabMenu({ tab }: { tab: TabCategoryList }) {
  return (
    <TabMenuBoxComponent tab={tab}>
      <motion.div className={styles.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {tab.title}
        <TabMenuTableAlert tab={tab} />
        <TabMenuOrderAlert tab={tab} />
      </motion.div>
    </TabMenuBoxComponent>
  );
}
