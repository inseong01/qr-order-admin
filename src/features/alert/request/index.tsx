import { useRef } from 'react';
import { useAtomValue } from 'jotai';
import { motion, AnimatePresence } from 'motion/react';

import { useQueryRequestList } from '@/hooks/use-query/query';

import { MessageCountPannel, MessagePreview } from './components/message/message';
import { requestAlertAtom } from './store/atom';
import styles from './index.module.css';

export default function TableRequestAlert() {
  const reqeustMsgRef = useRef(null);
  const isAlertOn = useAtomValue(requestAlertAtom);
  const requestsQuery = useQueryRequestList();

  const notReadRequests = requestsQuery.data ?? [];
  const hasExtraMsg = notReadRequests.length > 0;
  const miniRequestCount = notReadRequests.length - 1 <= 0 ? 0 : notReadRequests.length - 1;

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
          {miniRequestCount > 0 && <MessageCountPannel count={miniRequestCount} />}

          {/* 테이블 요청 메시지 */}
          {hasExtraMsg && <MessagePreview request={notReadRequests[0]} requestRefetch={requestsQuery.refetch} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
