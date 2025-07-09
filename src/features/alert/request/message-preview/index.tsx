import { motion, AnimatePresence } from 'motion/react';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RequestItem } from '@/lib/supabase/function/request-item';

import categoryDummy from '@/mock/request_category.test.json';

import styles from './../index.module.css';

export default function MessagePreview({ list, tableNumber }: { list: RequestItem[]; tableNumber?: number }) {
  const categoryCountMap: Record<string, number> = {};

  list.forEach((l) => {
    categoryCountMap[l.category_id] = (categoryCountMap[l.category_id] || 0) + 1;
  });

  const summary = categoryDummy
    .map((c) => {
      const count = categoryCountMap[c.id];
      return count ? `${c.title} ${count}개` : null;
    })
    .filter(Boolean)
    .join(',');

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
            <div className={styles.title}>테이블 {tableNumber}</div>

            <div className={styles.closeBtn} onClick={() => alert('닫기')}>
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
