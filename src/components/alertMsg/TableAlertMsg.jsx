import styles from '@/style/AlertMsg.module.css';
import { fetchUpdateAlertMsg } from '../../lib/features/submitState/submitSlice';
import fetchTableRequestList from '../../lib/supabase/func/fetchTableRequestList';
import HiddenAlertMessage from './HiddenAlertMessage';
import DisplayedAlertMessage from './DisplayedAlertMessage';

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
  const tab = useSelector((state) => state.tabState.title);
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
  // variant
  const extraMsg = requestList.data.filter((list) => !list.isRead).slice(4);

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

  // 알림(컴포넌트) On/Off
  useEffect(() => {
    if (tab === 'table' && requestAlertList.length > 0 && !tableEditIsAble) {
      setAlertOn(requestAlertOn);
    } else {
      setAlertOn(false);
    }
  }, [tab, requestAlertList, requestAlertOn, tableEditIsAble]);

  // 알림 읽음 처리
  function onClickReadMsg(list) {
    return () => {
      // 오류 발생 시 alert on/off 기능 생성
      if (submitIsError) return;
      dispatch(fetchUpdateAlertMsg({ method: 'update', id: list.id }));
      selectId(list.id);
    };
  }

  return (
    <AnimatePresence>
      {alertOn && (
        <motion.div
          key={'reqeustMsgWrap'}
          className={styles.reqeustMsgWrap}
          ref={reqeustMsgRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <HiddenAlertMessage extraMsg={extraMsg} />
          <DisplayedAlertMessage requestAlertList={requestAlertList} onClickReadMsg={onClickReadMsg} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
