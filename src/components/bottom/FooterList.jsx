import styles from '@/style/bottom/FooterList.module.css';
import getTabMenu from '@/lib/supabase/func/getTabMenu';
import { changeTabState } from '@/lib/features/tabState/tabSlice';
import fetchOrderList from '../../lib/supabase/func/fetchOrderList';
import fetchTableRequestList from '../../lib/supabase/func/fetchTableRequestList';

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQueries } from '@tanstack/react-query';

// DB, footerList 추가 시 tabSlice.js switch case 영문 명 반환 추가
export default function FooterList() {
  // useState
  const [clicked, setClicked] = useState(0);
  const [isUnreadAlert, setUndreadAlert] = useState(false);
  const [isUnDoneList, setUndDoneList] = useState(false);
  // useSelector
  const orderTrigger = useSelector((state) => state.realtimeState.allOrderList.trigger);
  const requestTrigger = useSelector((state) => state.realtimeState.tableRequestList.trigger);
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const editTableisEditing = useSelector((state) => state.konvaState.isEditing);
  // useDispatch
  const dispatch = useDispatch();
  // useQuery
  const [tabMenu, allOrderList, requestList] = useQueries({
    queries: [
      {
        queryKey: ['tabMenu'],
        queryFn: getTabMenu,
        // staleTime: 1000 * 60 * 5,
        initialData: [],
      },
      {
        queryKey: ['allOrderList', orderTrigger],
        queryFn: () => fetchOrderList('select'),
        initialData: [],
      },
      {
        queryKey: ['requestList', requestTrigger],
        queryFn: () => fetchTableRequestList('select'),
        initialData: [],
      },
    ],
  });

  // requestList DB 수신 감지
  useEffect(() => {
    if (requestList.isFetching) return;
    // console.log('requestList: ', requestList);
    const isUndreadAlertList = requestList.data.some((list) => !list.isRead);
    setUndreadAlert(isUndreadAlertList);
  }, [requestList]);

  useEffect(() => {
    if (allOrderList.isFetching) return;
    // console.log('allOrderList: ', allOrderList);
    const isUnDoneOrderList = allOrderList.data.some((list) => !list.isDone);
    setUndDoneList(isUnDoneOrderList);
  }, [allOrderList]);

  function onClickChangeTab({ title }, idx) {
    return () => {
      if (isModalOpen) return;
      // 수정 중 tab 이동 임시 제한
      if (editTableisEditing) {
        alert('수정 중입니다.');
        return;
      }
      dispatch(changeTabState({ state: title }));
      setClicked(idx);
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
                {list.title === '좌석' && isUnreadAlert && <div className={`${styles.alertStatus}`}></div>}
                {list.title === '주문' && isUnDoneList && <div className={`${styles.alertStatus}`}></div>}
              </motion.div>
              {clicked === idx && <motion.div className={styles.line} layoutId="footerLine"></motion.div>}
            </div>
          );
        })}
    </>
  );
}
