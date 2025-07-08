import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { useBoundStore } from '../../../../lib/store/use-bound-store';

import { Order } from '../../../../types/common';

import useModalSubmitData from '../../hook/use-modal-submit-data';

import createReceipt from '../function/create-receipt';

import styles from './table-info.module.css';

import QRPreviewBox from './qr-preview-box';
import OrderSummary from './order-summary';

export default function TableInfoPannel() {
  const { onTableSubmitData } = useModalSubmitData();

  const tableInfo = useBoundStore((state) => state.itemBox.selectedTable);

  const [isCicked, clickDiv] = useState(false);

  function onClickChangeBox() {
    clickDiv((prev) => !prev);
  }

  return (
    <form className={styles.submitForm} onSubmit={onTableSubmitData}>
      <div className={styles.wrap}>
        {/* 제목 */}
        <div className={styles.title}>
          {/* 테이블명 */}
          <h3 className={styles.table}>{`테이블 ${tableInfo.tableNum}`}</h3>

          {/* 토글 */}
          <div className={`${styles.toggleBox} ${isCicked ? '' : styles.off}`} onClick={onClickChangeBox}>
            <motion.div layout className={styles.toggle}></motion.div>
          </div>
        </div>

        {/* 내용 */}
        <SwitchContentBox isCicked={isCicked} />
      </div>
    </form>
  );
}

function SwitchContentBox({ isCicked }: { isCicked: boolean }) {
  const tableInfo = useBoundStore((state) => state.itemBox.selectedTable);

  const orderArr = tableInfo.order as Order[];
  const allOrderList = orderArr?.map((list) => list.orderList);
  const billArr = createReceipt(allOrderList);

  return (
    <div className={styles.content}>
      <AnimatePresence mode='wait' initial={false}>
        {isCicked ? <QRPreviewBox tableNum={tableInfo.tableNum} /> : <OrderSummary listData={billArr} />}
      </AnimatePresence>
    </div>
  );
}
