import styles from '@/style/modal/table/TableInfo.module.css';
import createReceipt from '../../../lib/function/createReceipt';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import QRcodeBox from './QRcodeBox';
import OrderListBox from './OrderListBox';

import { AnimatePresence } from 'motion/react';

export default function SwitchContentBox({ isCicked }) {
  // store
  const tableInfo = useBoundStore((state) => state.itemBox.selectedTable);
  // variable
  const allOrderList = tableInfo.order?.map((list) => list.orderList);
  const billArr = createReceipt(allOrderList);

  return (
    <div className={styles.content}>
      <AnimatePresence mode="wait" initial={false}>
        {isCicked ? <QRcodeBox tableNum={tableInfo.tableNum} /> : <OrderListBox listData={billArr} />}
      </AnimatePresence>
    </div>
  );
}
