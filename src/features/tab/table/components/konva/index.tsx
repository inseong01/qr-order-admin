import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';

import { tableAtom } from '../../store/table-atom';
import TableStage from './stage';
import styles from './index.module.css';

export default function KonvaSection() {
  const { tables } = useAtomValue(tableAtom);

  return (
    <motion.div className={styles.table} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {tables.length === 0 ? <div className={styles.title}>위젯에서 테이블을 생성해주세요</div> : <TableStage />}
    </motion.div>
  );
}
