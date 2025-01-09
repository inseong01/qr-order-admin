import styles from '@/style/bottom/TabMenu.module.css';
import { changeTabState } from '@/lib/features/tabState/tabSlice';
import { resetCategoryState } from '../../lib/features/categoryState/categorySlice';
import { resetSubmitState } from '../../lib/features/submitState/submitSlice';
import TabMenuTableAlert from './TabMenuTableAlert';
import TabeMenuOrderAlert from './TabeMenuOrderAlert';
import UnderLine from '../UnderLine';

import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function TabMenuBox({ children, tab }) {
  // useSelector
  const tabId = useSelector((state) => state.tabState.id);
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const editTableisEditing = useSelector((state) => state.konvaState.isEditing);
  const currentTabId = useSelector((state) => state.tabState.id);
  // useDispatch
  const dispatch = useDispatch();

  function onClickChangeTab({ title, id }) {
    return () => {
      if (isModalOpen) return;
      if (currentTabId === id) return;
      // 수정 중 tab 이동 임시 제한
      if (editTableisEditing) {
        alert('수정 중입니다.');
        return;
      }
      dispatch(changeTabState({ title, id }));
      // 탭 변경마다 제출 상태 초기화
      dispatch(resetSubmitState());
      dispatch(resetCategoryState());
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

export default function TabMenu({ tab }) {
  return (
    <TabMenuBox tab={tab}>
      <motion.div className={styles.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {tab.title}
        <TabMenuTableAlert tab={tab} />
        <TabeMenuOrderAlert tab={tab} />
      </motion.div>
    </TabMenuBox>
  );
}
