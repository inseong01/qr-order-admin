import styles from '@/style/modal/table/TableInfo.module.css';
import OrderListBox from './OrderListBox';
import QRcodeBox from './QRcodeBox';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export default function TableInfo({ billArr, tableNum }) {
  // useState
  const [isCicked, clickDiv] = useState(false);

  function onClickChangeBox() {
    clickDiv((prev) => !prev);
  }

  return (
    <>
      <div className={styles.title}>
        <h3 className={styles.table}>{`테이블 ${tableNum}`}</h3>
        <div className={`${styles.toggleBox} ${isCicked ? '' : styles.off}`} onClick={onClickChangeBox}>
          <motion.div layout className={styles.toggle}></motion.div>
        </div>
      </div>
      <div className={styles.content}>
        <AnimatePresence mode="wait" initial={false}>
          {!isCicked ? <OrderListBox listData={billArr} /> : <QRcodeBox tableNum={tableNum} />}
        </AnimatePresence>
      </div>
    </>
  );
}
