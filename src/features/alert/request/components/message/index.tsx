import { useSetAtom } from 'jotai';
import { motion, AnimatePresence } from 'motion/react';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

import LIGHT_CLOSE_ICON from '@/assets/icon/light-close-icon.svg';
import { useQueryFirstRequest } from '@/hooks/use-query/query';
import { showToastAtom } from '@/features/alert/toast/store/atom';
import { Request, updateRequest } from '@/lib/supabase/tables/request';

import styles from './index.module.css';

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
  request: Request;
  requestRefetch: (options?: RefetchOptions) => Promise<QueryObserverResult<Request[], Error>>;
};

export function MessagePreview({ request, requestRefetch }: MessageCountPannelProps) {
  const firstRequestQuery = useQueryFirstRequest(request.id);
  const showToast = useSetAtom(showToastAtom);
  const summary =
    firstRequestQuery.data
      ?.map(({ quantity, request_category }) => `${request_category.title} ${quantity}개`)
      .join(', ') ?? '';

  /* 좌석 요청 읽음 처리 */
  async function readRequest() {
    try {
      await updateRequest(request.id);
      await requestRefetch();
      await firstRequestQuery.refetch();
    } catch (err) {
      console.error(err);
      showToast('요청 처리 과정에서 오류가 발생했습니다.');
    }
  }

  return (
    <motion.ul className={`${styles.reqeustMsg}`}>
      <AnimatePresence mode='popLayout' initial={false}>
        <motion.li
          layout
          key={request.id}
          className={styles.msg}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
        >
          {/* 상단 */}
          <div className={styles.top}>
            <div className={styles.title}>테이블 {request.table.number}</div>

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
