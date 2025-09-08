import { useAtomValue } from 'jotai';
import { motion, AnimatePresence } from 'motion/react';

import { useQueryRequestList } from '@/hooks/use-query/request/query';

import { MessageCountPannel, MessagePreview } from './components/message';
import { requestAlertAtom } from './store/atom';
import styles from './index.module.css';

export default function TableRequestAlert() {
  const isAlertOn = useAtomValue(requestAlertAtom);
  const requestsQuery = useQueryRequestList();

  const requestItems = requestsQuery.data?.filter((d) => d.request !== null) ?? [];
  const requests = Object.groupBy(requestItems, (item) => item.request?.id!);
  const requestIds = Object.keys(requests);

  const hasExtraMsg = requestIds.length > 0;
  const miniRequests = requestIds.length - 1;
  const firstReq = requests[requestIds[0]];

  return (
    <AnimatePresence>
      {isAlertOn && (
        <motion.div
          key={'reqeustMsgWrap'}
          className={styles.reqeustMsgWrap}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 간소화된 메시지 */}
          {miniRequests > 0 && <MessageCountPannel count={miniRequests} />}

          {/* 테이블 요청 메시지 */}
          {hasExtraMsg && <MessagePreview request={firstReq!} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
