import styles from '@/style/bottom/TabMenu.module.css';
import { changeTabState } from '@/lib/features/tabState/tabSlice';
import { resetCategoryState } from '../../lib/features/categoryState/categorySlice';
import TabeMenuTableAlert from './TabeMenuTableAlert';
import TabeMenuOrderAlert from './TabeMenuOrderAlert';
import UnderLine from '../UnderLine';

import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

function TabMenuBox({ children, list }) {
  // useSelector
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
      dispatch(resetCategoryState());
    };
  }

  return (
    <div
      className={`${styles.listBox} ${currentTabId === list.id ? styles.clicked : ''}`}
      onClick={onClickChangeTab(list)}
    >
      {children}
      <UnderLine list={list} selectedId={currentTabId} position={'top'} />
    </div>
  );
}

export default function TabMenu({ list }) {
  return (
    <TabMenuBox list={list}>
      <motion.div className={styles.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {list.title}
        <TabeMenuTableAlert list={list} />
        <TabeMenuOrderAlert list={list} />
      </motion.div>
    </TabMenuBox>
  );
}
