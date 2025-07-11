import { atom, useAtomValue } from 'jotai';
import { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import requestDummy from '@/mock/request.test.json';

import { requestAlertAtom } from './store/atom';
import MessagePreview from './message-preview';
import MessageCountPannel from './message-count';
import styles from './index.module.css';

// requestDummy 상태
const requestDummyAtom = atom(requestDummy.filter((r) => !r.is_read));
export const readRequestDummyAtom = atom(null, (get, set, id: string) => {
  const requests = get(requestDummyAtom);
  set(requestDummyAtom, requests.filter((r) => r.id !== id) ?? []);
});

export default function TableRequestAlert() {
  const reqeustMsgRef = useRef(null);

  const notReadRequests = useAtomValue(requestDummyAtom);
  const isAlertOn = useAtomValue(requestAlertAtom);

  // 좌석 요청 읽지 않은 목록 가져오기 (request Table)
  const hasExtraMsg = notReadRequests.length > 0;
  const requestCount = notReadRequests.length - 1 <= 0 ? 0 : notReadRequests.length - 1;

  // 알림 메시지 업데이트

  // 읽은 알림 안 읽은 목록에서 제외하기

  // 클릭 시 알림 읽음 처리 (DB)

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
          {requestCount > 0 && <MessageCountPannel count={requestCount} />}

          {/* 테이블 요청 메시지 */}
          {hasExtraMsg && <MessagePreview notReadRequest={notReadRequests[0]} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
