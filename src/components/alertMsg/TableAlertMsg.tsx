import styles from '@/style/AlertMsg.module.css';
import useQueryRequestList from '../../lib/hook/useQuery/useQueryRequestList';
import { useBoundStore } from '../../lib/store/useBoundStore';
import HiddenAlertMessage from './HiddenAlertMessage';
import DisplayedAlertMessage from './DisplayedAlertMessage';
import { RequestList } from '../../types/common';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function TableAlertMsg() {
  // useQuery
  const { data, isFetching } = useQueryRequestList();
  // variant
  const requestList = data ? data : [];
  // useState
  const [requestAlertList, setRequestAlertList] = useState<RequestList[]>(requestList);
  const [id, selectId] = useState('');
  const [alertOn, setAlertOn] = useState(false);
  const [isClicked, setClick] = useState(false);
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

  // 알림 메시지 업데이트
  useEffect(() => {
    if (!data) return;
    if (isFetching) return;
    setRequestAlertList(data);
    setClick(false);
  }, [data, isFetching]);

  // 읽은 알림 안 읽은 목록에서 제외하기
  useEffect(() => {
    /*
      19 버전
      : useOptimistic 사용 가능

      18 버전 (현재)
      : 성공 예상하여 처리, rejected 상태는 이전 데이터 부여
      요청 알림 query가 실패할 때 어떻게 되는 지 알아야 함
    */
    const prevData = [...requestAlertList];
    if (id) {
      setRequestAlertList((prev) => prev.filter((msg) => msg.id !== id));
    }
    if (id && submitStatus === 'rejected') {
      setRequestAlertList(prevData);
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
      // 연속 클릭 제한
      if (isClicked) return;
      // 오류 발생 시 읽음 처리 제한
      if (submitIsError) return;
      fetchUpdateAlertMsg({ method: 'update', id: list.id });
      selectId(list.id);
      setClick(true);
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
          <HiddenAlertMessage extraMsg={requestAlertList} />
          <DisplayedAlertMessage requestAlertList={requestAlertList} onClickReadMsg={onClickReadMsg} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
