import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { footerAtom } from '@/features/page/footer';

import { alertAtom } from '@/store/atom/alert-atom';

import requestItemDummy from '@/mock/request_item.test.json';
import requestDummy from '@/mock/request.test.json';
import tableDummy from '@/mock/table.test.json';

import MessagePreview from './message-preview';
import MessageCountPannel from './message-count';
import styles from './index.module.css';

export default function TableRequestAlert() {
  // 좌석 요청 읽지 않은 목록 가져오기 (request Table)
  const notReadRequests = requestDummy.filter((r) => !r.is_read);
  const requestCount = requestDummy.length - 1 <= 0 ? 0 : requestDummy.length - 1;
  // > 총 개수 - 1 = MessageCountPannel 전달
  // 그중 가장 오래된 첫번째 목록 아이디로 요청 항목 여럿 가져오기 (request-item Table)
  const firstRequest = requestItemDummy.filter((r) => r.request_id === notReadRequests[0].id);
  // > MessagePreview 전달
  const firstTable = tableDummy.find((t) => t.id === notReadRequests[0].table_id);

  // const { data, isFetching } = useQueryRequestList();

  const [id, selectId] = useState('');
  const [isClicked, setClick] = useState(false);
  // const [requestAlertList, setRequestAlertList] = useState<Request[]>(data ? data : []);

  const tab = useAtomValue(footerAtom);
  const isAlertOn = useAtomValue(alertAtom);
  // const submitStatus = useBoundStore((state) => state.submit.status);
  // const submitIsError = useBoundStore((state) => state.submit.isError);
  // const requestAlertOn = useBoundStore((state) => state.alert.isOn);
  // const tableEditIsAble = useBoundStore((state) => state.konva.isAble);
  // const fetchUpdateAlertMsg = useBoundStore((state) => state.fetchUpdateAlertMsg);

  const reqeustMsgRef = useRef(null);

  // 알림 메시지 업데이트
  // useEffect(() => {
  //   if (!data) return;
  //   if (isFetching) return;

  //   setRequestAlertList(data);
  //   setClick(false);
  // }, [data, isFetching]);

  // 읽은 알림 안 읽은 목록에서 제외하기
  // useEffect(() => {
  //   /*
  //     19 버전
  //     : useOptimistic 사용 가능

  //     18 버전 (현재)
  //     : 성공 예상하여 처리, rejected 상태는 이전 데이터 부여
  //     요청 알림 query가 실패할 때 어떻게 되는 지 알아야 함
  //   */
  //   const prevData = [...requestAlertList];
  //   if (id) {
  //     setRequestAlertList((prev) => prev.filter((msg) => msg.id !== id));
  //   }
  //   if (id && submitStatus === 'rejected') {
  //     setRequestAlertList(prevData);
  //   }
  // }, [id, submitStatus]);

  // 알림 On/Off
  // useEffect(() => {
  //   // 좌석 탭 아니면 반환
  //   // if (tab !== 'table') {
  //   //   return setAlertOn(false);
  //   // }
  //   // 편집 중이면
  //   if (tableEditIsAble) {
  //     return setAlertOn(false);
  //   }
  //   // 토글 여부에 따라 On/Off
  //   return setAlertOn(requestAlertOn);
  // }, [tab, requestAlertList, requestAlertOn, tableEditIsAble]);

  // 클릭 시 알림 읽음 처리 (DB)
  // function onClickReadMsg(list: RequestList) {
  //   return () => {
  //     // 연속 클릭 제한
  //     if (isClicked) return;
  //     // 오류 발생 시 읽음 처리 제한
  //     if (submitIsError) return;
  //     fetchUpdateAlertMsg({ method: 'update', id: list.id });
  //     selectId(list.id);
  //     setClick(true);
  //   };
  // }

  const hasExtraMsg = notReadRequests.length > 0;

  return (
    <AnimatePresence>
      {isAlertOn && (
        <motion.div
          key={'reqeustMsgWrap'}
          className={styles.reqeustMsgWrap}
          ref={reqeustMsgRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 간소화된 메시지 */}
          {hasExtraMsg && <MessageCountPannel count={requestCount} />}

          {/* 테이블 요청 메시지 */}
          <MessagePreview list={firstRequest} tableNumber={firstTable?.number} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
