'use client';

import styles from '@/style/bottom/FooterList.module.css';
import getTabMenu from '@/lib/supabase/func/getTabMenu';
import { changeTabState } from '@/lib/features/tabState/tabSlice';

import { motion } from 'motion/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

// DB, footerList 추가 시 tabSlice.js switch case 영문 명 반환 추가
export default function FooterList() {
  const isAlert = true;
  // useState
  const [clicked, setClicked] = useState(0);
  // useSelector
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const editTableisEditing = useSelector((state) => state.konvaState.isEditing);
  // useDispatch
  const dispatch = useDispatch();
  // useQuery
  const tabMenu = useQuery({
    queryKey: ['tabMenu'],
    queryFn: getTabMenu,
    staleTime: 1000 * 60 * 5,
  });

  function onClickChangeTab({ title }, idx) {
    return () => {
      if (isModalOpen) return;
      // 수정 중 tab 이동 임시 제한
      if (editTableisEditing) {
        alert('수정 중입니다.');
        return;
      }
      dispatch(changeTabState({ state: title }));
      setClicked((prev) => (prev = idx));
    };
  }

  return (
    <>
      {!tabMenu.isLoading &&
        tabMenu.data.map((list, idx) => {
          return (
            <div
              key={idx}
              className={`${styles.listBox} ${clicked === idx ? styles.clicked : ''}`}
              onClick={onClickChangeTab(list, idx)}
            >
              <motion.div
                className={styles.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {list.title}
                {list.title === '좌석' && isAlert && <div className={styles.alertStatus}></div>}
              </motion.div>
              {clicked === idx && <motion.div className={styles.line} layoutId="footerLine"></motion.div>}
            </div>
          );
        })}
    </>
  );
}
