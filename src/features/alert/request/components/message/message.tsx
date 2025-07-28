import { motion, AnimatePresence } from 'motion/react';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { useQueryFirstRequest } from '@/hooks/use-query/query';
import { Request, updateRequest } from '@/lib/supabase/tables/request';

import styles from './message.module.css';

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
                initial={{ scaleX: 0.5, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0.5, opacity: 0 }}
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
  request: Request;
  requestRefetch: (options?: RefetchOptions) => Promise<QueryObserverResult<Request[], Error>>;
};

export function MessagePreview({ request, requestRefetch }: MessageCountPannelProps) {
  const firstRequestQuery = useQueryFirstRequest(request.id);
  const summary =
    firstRequestQuery.data
      ?.map(({ quantity, request_category }) => `${request_category.title} ${quantity}개`)
      .join(', ') ?? '';

  /* 좌석 요청 읽음 처리  */
  async function readRequest() {
    await updateRequest(request.id);
    await requestRefetch();
    await firstRequestQuery.refetch();
  }

  return (
    <motion.ul className={`${styles.reqeustMsg}`}>
      <AnimatePresence mode='popLayout'>
        <motion.li
          key={request.id}
          className={styles.msg}
          initial={{ scaleX: 0.5, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ scaleX: 0.5, opacity: 0 }}
          layout
        >
          {/* 상단 */}
          <div className={styles.top}>
            <div className={styles.title}>테이블 {request.table.number}</div>

            <div className={styles.closeBtn} onClick={readRequest}>
              <FontAwesomeIcon icon={faXmark} size='lg' />
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
