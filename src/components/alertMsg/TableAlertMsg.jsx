import styles from '@/style/AlertMsg.module.css';
import { fetchUpdateAlertMsg } from '../../lib/features/submitState/submitSlice';
import useQueryRequestList from '../../lib/hook/useQuery/useQueryRequestList';
import HiddenAlertMessage from './HiddenAlertMessage';
import DisplayedAlertMessage from './DisplayedAlertMessage';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';

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
  const requestAlertOn = useSelector((state) => state.realtimeState.tableRequestList.isOn);
  // useRef
  const reqeustMsgRef = useRef(null);
  // useDispatch
  const dispatch = useDispatch();
  // useQuery
  const { data } = useQueryRequestList();
  // variant
  const extraMsg = data?.filter((list) => !list.isRead).slice(4);

  // 읽지 않은 이전 요청 불러오기 (수 제한)
  useEffect(() => {
    if (!data) return;
    const notReadMsg = data.filter((list) => !list.isRead).slice(0, 4);
    setRequestAlertList(notReadMsg);
  }, [data]);

  // 읽은 알림 안 읽은 목록에서 제외하기
  useEffect(() => {
    if (id && submitStatus === 'fulfilled') {
      setRequestAlertList((prev) => prev.filter((msg) => msg.id !== id));
    }
  }, [id, submitStatus]);

  // 알림 On/Off
  useEffect(() => {
    // 좌석 탭 아니면 반환
    if (tab !== 'table') {
      return setAlertOn(false);
    }
    // 편집 중이면
    if (tableEditIsAble) {
      return setAlertOn(false);
    }
    // 토글 여부에 따라 On/Off
    return setAlertOn(requestAlertOn);
  }, [tab, requestAlertList, requestAlertOn, tableEditIsAble]);

  // 클릭 시 알림 읽음 처리 (DB)
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
