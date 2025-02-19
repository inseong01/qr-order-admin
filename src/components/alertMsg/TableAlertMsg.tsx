import styles from '@/style/AlertMsg.module.css';
import useQueryRequestList from '../../lib/hook/useQuery/useQueryRequestList';
import { useBoundStore } from '../../lib/store/useBoundStore';
import HiddenAlertMessage from './HiddenAlertMessage';
import DisplayedAlertMessage from './DisplayedAlertMessage';
import { RequestList } from '../../types/common';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function TableAlertMsg() {
  // useState
  const [requestAlertList, setRequestAlertList] = useState<RequestList[]>([]);
  const [id, selectId] = useState('');
  const [alertOn, setAlertOn] = useState(false);
  // store
  const submitStatus = useBoundStore((state) => state.submit.status);
  const submitIsError = useBoundStore((state) => state.submit.isError);
  // store
  const tab = useBoundStore((state) => state.tab.title);
  const requestAlertOn = useBoundStore((state) => state.alert.isOn);
  const tableEditIsAble = useBoundStore((state) => state.konva.isAble);
  const fetchUpdateAlertMsg = useBoundStore((state) => state.fetchUpdateAlertMsg);
  // useRef
  const reqeustMsgRef = useRef(null);
  // useQuery
  const { data, isFetching } = useQueryRequestList();
  // variant
  const extraMsg = data ? data.filter((list) => !list.isRead).slice(4) : [];

  // 읽지 않은 이전 요청 불러오기
  useEffect(() => {
    /*
      - 내용 표시 요청 개수 4개로 제한
      - 요청이 없다면 [] 할당하여 오류 발생 방지
    */
    if (isFetching) return;
    const notReadMsg = data ? data.filter((list) => !list.isRead).slice(0, 4) : [];
    setRequestAlertList(notReadMsg);
  }, [data, isFetching]);

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
  function onClickReadMsg(list: RequestList) {
    return () => {
      // 오류 발생 시 읽음 처리 제한
      if (submitIsError) return;
      fetchUpdateAlertMsg({ method: 'update', id: list.id });
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
