import { useRef } from 'react';
import { useAtomValue } from 'jotai';
import { motion, AnimatePresence } from 'motion/react';
import { useQuery } from '@tanstack/react-query';

import { REQUEST_LIST_QUERY_KEY } from '@/hooks/use-query/query';
import { Request } from '@/lib/supabase/function/request';

import { requestAlertAtom } from './store/atom';
import MessagePreview from './message-preview';
import MessageCountPannel from './message-count';
import styles from './index.module.css';

export default function TableRequestAlert() {
  const reqeustMsgRef = useRef(null);
  const isAlertOn = useAtomValue(requestAlertAtom);
  const requests = useQuery<Request[]>({ queryKey: REQUEST_LIST_QUERY_KEY });

  const notReadRequests = requests.data ?? [];
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
          {hasExtraMsg && <MessagePreview request={notReadRequests[0]} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
