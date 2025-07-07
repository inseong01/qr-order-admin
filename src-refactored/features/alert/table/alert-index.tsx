import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { useBoundStore } from '../../../../lib/store/use-bound-store';

import { useQueryRequestList } from '../../../../hooks/use-query/query';

import { RequestList } from '../../../../types/common';

import styles from './alert-index.module.css';

import HiddenAlertMessage from './hidden-alert-message';
import DisplayedAlertMessage from './displayed-alert-message';

export default function TableAlertMsg() {
  const { data, isFetching } = useQueryRequestList();

  const [id, selectId] = useState('');
  const [alertOn, setAlertOn] = useState(false);
  const [isClicked, setClick] = useState(false);
  const [requestAlertList, setRequestAlertList] = useState<RequestList[]>(data ? data : []);

  const submitStatus = useBoundStore((state) => state.submit.status);
  const submitIsError = useBoundStore((state) => state.submit.isError);
  // const tab = useBoundStore((state) => state.tab.title);
  const requestAlertOn = useBoundStore((state) => state.alert.isOn);
  const tableEditIsAble = useBoundStore((state) => state.konva.isAble);
  const fetchUpdateAlertMsg = useBoundStore((state) => state.fetchUpdateAlertMsg);

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
    // if (tab !== 'table') {
    //   return setAlertOn(false);
    // }
    // 편집 중이면
    if (tableEditIsAble) {
      return setAlertOn(false);
    }
    // 토글 여부에 따라 On/Off
    return setAlertOn(requestAlertOn);
  }, [requestAlertList, requestAlertOn, tableEditIsAble]);
  // }, [tab, requestAlertList, requestAlertOn, tableEditIsAble]);

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

  const hasExtraMsg = requestAlertList.length > 0;
  const extraMsgList = hasExtraMsg ? requestAlertList.slice(4) : requestAlertList;

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
          {/* 간소화된 메시지 */}
          {hasExtraMsg && <HiddenAlertMessage list={extraMsgList} />}

          {/* 테이블 요청 메시지 */}
          <DisplayedAlertMessage list={requestAlertList} onClickReadMsg={onClickReadMsg} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
