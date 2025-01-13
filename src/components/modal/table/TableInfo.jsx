import styles from '@/style/modal/table/TableInfo.module.css';
import createReceipt from '../../../lib/function/createReceipt';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import OrderListBox from './OrderListBox';
import QRcodeBox from './QRcodeBox';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export default function TableInfo() {
  // store
  const tableInfo = useBoundStore((state) => state.itemBox.selectedTable);
  // useState
  const [isCicked, clickDiv] = useState(false);
  // variable
  const allOrderList = tableInfo.order?.map((list) => list.orderList);
  const billArr = createReceipt(allOrderList);

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
      <div className={styles.content}>
        <AnimatePresence mode="wait" initial={false}>
          {isCicked ? <QRcodeBox tableNum={tableInfo.tableNum} /> : <OrderListBox listData={billArr} />}
        </AnimatePresence>
      </div>
    </>
  );
}
