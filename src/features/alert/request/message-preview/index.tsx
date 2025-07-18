import { motion, AnimatePresence } from 'motion/react';

import { useQueryFirstRequest } from '@/hooks/use-query/query';
import { Request, updateRequest } from '@/lib/supabase/function/request';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './../index.module.css';

export default function MessagePreview({ request }: { request: Request }) {
  const { data } = useQueryFirstRequest(request.id);
  const summary =
    data
      ?.map(({ quantity, request_category }) => {
        return `${request_category.title} ${quantity}개`;
      })
      .join(', ') ?? '';

  async function readRequest() {
    await updateRequest(request.id);
  }

  return (
    <motion.ul className={`${styles.reqeustMsg}`}>
      <AnimatePresence mode='popLayout'>
        <motion.li
          className={styles.msg}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
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
