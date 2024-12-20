import styles from '@/style/AlertMsg.module.css';
import { fetchUpdateAlertMsg } from '../../lib/features/submitState/submitSlice';
import fetchTableRequestList from '../../lib/supabase/func/fetchTableRequestList';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

export default function TableAlertMsg() {
  // useState
  const [requestAlertList, setRequestAlertList] = useState([]);
  const [id, selectId] = useState('');
  const [alertOn, setAlertOn] = useState(false);
  // useSelector
  const tab = useSelector((state) => state.tabState.state);
  const submitStatus = useSelector((state) => state.submitState.status);
  const submitIsError = useSelector((state) => state.submitState.isError);
  const tableEditIsAble = useSelector((state) => state.konvaState.isAble);
  const requestTrigger = useSelector((state) => state.realtimeState.tableRequestList.trigger);
  const requestAlertOn = useSelector((state) => state.realtimeState.tableRequestList.isOn);
  // useRef
  const reqeustMsgRef = useRef(null);
  // useDispatch
  const dispatch = useDispatch();
  // useQuery
  const requestList = useQuery({
    queryKey: ['requestList', requestTrigger],
    queryFn: () => fetchTableRequestList('select'),
    initialData: [],
  });

  // 읽지 않은 이전 요청 불러오기 (수 제한)
  useEffect(() => {
    if (requestList.isFetching) return;
    const notReadMsg = requestList.data.filter((list) => !list.isRead).slice(0, 4);
    setRequestAlertList(notReadMsg);
  }, [requestList.isFetching, requestList.data]);

  // 알림 치우기
  useEffect(() => {
    if (id && submitStatus === 'fulfilled') {
      setRequestAlertList((prev) => prev.filter((msg) => msg.id !== id));
    }
  }, [id, submitStatus]);
  useEffect(() => {
    if (tab === 'table' && requestAlertList.length > 0 && !tableEditIsAble) {
      setAlertOn(requestAlertOn);
    } else {
      setAlertOn(false);
    }
  }, [tab, requestAlertList, requestAlertOn, tableEditIsAble]);

  function onClickReadMsg(list) {
    return () => {
      // 오류 발생 시 alert on/off 기능 생성
      if (submitIsError) return;
      dispatch(fetchUpdateAlertMsg({ method: 'update', id: list.id }));
      selectId(list.id);
    };
  }
  console.log(requestList.data.filter((list) => !list.isRead));
  return (
    <AnimatePresence>
      {alertOn && (
        <motion.div
          className={styles.reqeustMsgWrap}
          ref={reqeustMsgRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.ul
            className={`${styles.reqeustMsg} ${
              requestList.data.filter((list) => !list.isRead).slice(4).length > 0 ? styles.moreAlert : ''
            }`}
          >
            <AnimatePresence mode="popLayout">
              {requestAlertList.map((list) => {
                return (
                  <motion.li
                    key={list.id}
                    className={styles.msg}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    layout
                  >
                    <div className={styles.top}>
                      <div className={styles.title}>테이블 {list.tableNum}</div>
                      <div className={styles.closeBtn} onClick={onClickReadMsg(list)}>
                        <img src="/img/close-icon.png" alt="닫기" />
                      </div>
                    </div>
                    <div className={styles.bottom}>
                      <div>
                        <span className={styles.cate}>요청</span>
                      </div>
                      <span>{list.requestList}</span>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
