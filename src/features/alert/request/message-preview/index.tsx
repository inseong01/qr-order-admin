import { atom, useAtomValue, useSetAtom } from 'jotai';
import { motion, AnimatePresence } from 'motion/react';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Request } from '@/lib/supabase/function/request';
import categoryDummy from '@/mock/request_category.test.json';
import requestItemDummy from '@/mock/request_item.test.json';
import tableDummy from '@/mock/table.test.json';

import { readRequestDummyAtom } from '..';
import styles from './../index.module.css';

// requestItemDummy 상태
const requestItemDummyAtom = atom(requestItemDummy);
// tableDummy 상태
const tableDummyAtom = atom(tableDummy);

export default function MessagePreview({ notReadRequest }: { notReadRequest: Request }) {
  const requestItems = useAtomValue(requestItemDummyAtom);
  const tableData = useAtomValue(tableDummyAtom);
  const readRequest = useSetAtom(readRequestDummyAtom);

  // 가장 오래된 첫번째 목록 아이디로 요청 항목 여럿 가져오기 (request-item Table)
  const firstRequest = requestItems.filter((r) => r.request_id === notReadRequest.id);
  const table = tableData.find((t) => t.id === notReadRequest.table_id);

  const categoryCountMap: Record<string, number> = {};
  firstRequest.forEach((l) => {
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
            <div className={styles.title}>테이블 {table?.number}</div>

            <div
              className={styles.closeBtn}
              onClick={() => {
                readRequest(firstRequest[0].request_id);
              }}
            >
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
