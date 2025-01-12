import styles from '@/style/bottom/TabMenu.module.css';
import { resetCategoryState } from '../../lib/features/categoryState/categorySlice';
import { resetSubmitState } from '../../lib/features/submitState/submitSlice';
import { resetItemState } from '../../lib/features/itemState/itemSlice';
import { useBoundStore } from '../../lib/store/useBoundStore';
import TabMenuTableAlert from './TabMenuTableAlert';
import TabeMenuOrderAlert from './TabeMenuOrderAlert';
import UnderLine from '../UnderLine';

import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

function TabMenuBox({ children, tab }) {
  // useSelector
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const editTableisEditing = useSelector((state) => state.konvaState.isEditing);
  // useDispatch
  const dispatch = useDispatch();
  // store
  const currentTabId = useBoundStore((state) => state.tab.id);
  const changeTabState = useBoundStore((state) => state.changeTabState);

  function onClickChangeTab({ title, id }) {
    return () => {
      if (isModalOpen) return;
      if (currentTabId === id) return;
      // 수정 중 tab 이동 임시 제한
      if (editTableisEditing) {
        alert('수정 중입니다.');
        return;
      }
      dispatch(changeTabState({ tableId: id }));
      // 탭 변경마다 제출 상태 초기화
      dispatch(resetSubmitState());
      dispatch(resetCategoryState());
      dispatch(resetItemState());
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
