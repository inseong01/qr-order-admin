import { motion, AnimatePresence } from 'motion/react';

import LIGHT_CLOSE_ICON from '@/assets/icon/light-close-icon.svg';

import { useMutationUpdateRequest } from '@/hooks/use-query/request/query';

import { RequestItem } from '@/lib/supabase/tables/request-item';

import styles from './index.module.css';
import { formatRequestText } from '../../util/format-request-text';

export function MessageCountPannel({ count }: { count: number }) {
  return (
    <ul className={`${styles.reqeustMsg} ${styles.hidden}`}>
      <AnimatePresence mode='popLayout'>
        {Array(count)
          .fill(0)
          .map((_, idx) => {
            return (
              <motion.li
                layout
                key={idx}
                className={styles.msg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={styles.top}></div>
              </motion.li>
            );
          })}
      </AnimatePresence>
    </ul>
  );
}

type MessageCountPannelProps = {
  request: RequestItem[];
};

export function MessagePreview({ request }: MessageCountPannelProps) {
  const requestId = request[0].request?.id;
  const requestTable = request[0].request?.table.number;
  const summary = request.map(formatRequestText).join(', ') ?? '';

  const mutationUpdateRequest = useMutationUpdateRequest();

  /* 좌석 요청 읽음 처리 */
  async function readRequest() {
    if (!requestId) return;
    mutationUpdateRequest.mutate({ id: requestId });
  }

  return (
    <motion.ul className={`${styles.reqeustMsg}`}>
      <AnimatePresence mode='popLayout' initial={false}>
        <motion.li
          layout
          key={requestId}
          className={styles.msg}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
        >
          {/* 상단 */}
          <div className={styles.top}>
            <div className={styles.title}>테이블 {requestTable}</div>

            <div className={styles.closeBtn} onClick={readRequest}>
              <img src={LIGHT_CLOSE_ICON} alt='닫기' />
            </div>
          </div>

          {/* 하단 */}
          <div className={styles.bottom}>
            <div>
              <span className={styles.cate}>요청</span>
            </div>

            <span>{summary}</span>
          </div>
        </motion.li>
      </AnimatePresence>
    </motion.ul>
  );
}
