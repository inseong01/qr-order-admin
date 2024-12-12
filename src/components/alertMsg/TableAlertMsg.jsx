import styles from '@/style/AlertMsg.module.css';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import fetchTableRequestList from '../../lib/supabase/func/fetchTableRequestList';
import useGetRealtimeData from '../../lib/hook/useGetRealtimeData';

export default function TableAlertMsg() {
  // useState
  const [requestAlertList, setRequestAlertList] = useState([]);
  const { data } = useGetRealtimeData();

  // useRef
  const reqeustMsgRef = useRef(null);
  // useQuery
  const requestList = useQuery({
    queryKey: ['requestList', data],
    queryFn: () => fetchTableRequestList('select'),
    initialData: [],
  });

  // 읽지 않은 이전 요청 불러오기
  useEffect(() => {
    if (requestList.isFetching) return;
    const notReadMsg = requestList.data.filter((list) => !list.isRead);
    setRequestAlertList(notReadMsg);
  }, [requestList.isFetching, requestList.data]);

  useEffect(() => {
    // 삽입 이벤트
    console.log('insert, data: ', data);
    // 업데이트 이벤트
    console.log('update, data: ', data.new);
    // data가 나오면 useQuery 동작
  }, [data]);

  function onClickReadMsg(list) {
    // idx -> 추후 key로 변경
    return async () => {
      const result = await fetchTableRequestList('update', list.id);
      // 오류 발생 시 null 반환, 비동기라 redux 사용하여 alertMsg 출력
      console.log('result: ', result);
    };
  }

  return (
    <div className={styles.reqeustMsgWrap} ref={reqeustMsgRef}>
      <motion.ul className={styles.reqeustMsg}>
        <AnimatePresence mode="popLayout">
          {requestList.isFetched &&
            requestAlertList.map((list, idx) => {
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
                    <span>요청사항:</span>
                    <br />
                    <span>{list.requestList}</span>
                  </div>
                </motion.li>
              );
            })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
