import styles from '@/style/modal/table/TableInfo.module.css';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import SwitchContentBox from './SwitchContentBox';

import { useState } from 'react';
import { motion } from 'motion/react';

export default function TableInfo() {
  // store
  const tableInfo = useBoundStore((state) => state.itemBox.selectedTable);
  // useState
  const [isCicked, clickDiv] = useState(false);

  function onClickChangeBox() {
    clickDiv((prev) => !prev);
  }

  return (
    <>
      <div className={styles.title}>
        <h3 className={styles.table}>{`테이블 ${tableInfo.tableNum}`}</h3>
        <div className={`${styles.toggleBox} ${isCicked ? '' : styles.off}`} onClick={onClickChangeBox}>
          <motion.div layout className={styles.toggle}></motion.div>
        </div>
      </div>
      <SwitchContentBox isCicked={isCicked} />
    </>
  );
}
