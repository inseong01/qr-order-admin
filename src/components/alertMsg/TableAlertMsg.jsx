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
  // useSelector
  const tab = useSelector((state) => state.tabState.state);
  const submitStatus = useSelector((state) => state.submitState.status);
  const submitIsError = useSelector((state) => state.submitState.isError);
  const requestTrigger = useSelector((state) => state.realtimeState.tableRequestList.trigger);
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

  // 읽지 않은 이전 요청 불러오기
  useEffect(() => {
    if (requestList.isFetching) return;
    const notReadMsg = requestList.data.filter((list) => !list.isRead);
    setRequestAlertList(notReadMsg);
  }, [requestList.isFetching, requestList.data]);

  // 알림 치우기
  useEffect(() => {
    if (id && submitStatus === 'fulfilled') {
      setRequestAlertList((prev) => prev.filter((msg) => msg.id !== id));
    }
  }, [id, submitStatus]);

  function onClickReadMsg(list) {
    return () => {
      // 오류 발생 시 alert on/off 기능 생성
      if (submitIsError) return;
      dispatch(fetchUpdateAlertMsg({ method: 'update', id: list.id }));
      selectId(list.id);
    };
  }

  return (
    <>
      {tab === 'table' && requestAlertList.length > 0 && (
        <div className={styles.reqeustMsgWrap} ref={reqeustMsgRef}>
          <motion.ul className={styles.reqeustMsg}>
            <AnimatePresence mode="popLayout">
              {requestAlertList.map((list, idx) => {
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
                      <div className={styles.title}>{list.tableName}</div>
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
        </div>
      )}
    </>
  );
}
