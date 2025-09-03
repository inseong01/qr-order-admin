import { useAtomValue, useSetAtom } from 'jotai';
import { AnimatePresence } from 'motion/react';

import { idAtom } from '@/store/id-atom';
import { useQueryOrderItems, useQueryTableList } from '@/hooks/use-query/query';

import LIGHT_PLUS_ICON from '@/assets/icon/light-plus.svg';

import { setModalClickAtom, tableToggleAtom } from '../store/atom';
import QRPreviewBox from './qr-code';
import ToggleDisplay from './toggle';
import OrderSummary from './order-summary';
import styles from './index.module.css';

export default function TableInfoContents() {
  const tableId = useAtomValue(idAtom);
  const isToggled = useAtomValue(tableToggleAtom);
  const tables = useQueryTableList();
  const allOrders = useQueryOrderItems();
  const setModalClick = useSetAtom(setModalClickAtom);

  function handleClose() {
    setModalClick(false);
  }

  const table = tables.data?.find((t) => t.id === tableId);
  const orders = allOrders.data?.filter((t) => t.order.table.id === tableId) ?? [];

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        {/* 토글 */}
        <ToggleDisplay />

        {/* 제목 */}
        <h2 className={styles.modalTitle}>{`테이블 ${table?.number}`}</h2>

        {/* 닫기 */}
        <button type='button' className={styles.close} onClick={handleClose}>
          <img src={LIGHT_PLUS_ICON} alt='닫기' />
        </button>
      </div>

      {/* 내용 */}
      <div className={styles.content}>
        <AnimatePresence mode='wait' initial={false}>
          {isToggled ? <QRPreviewBox tableNumber={table?.number} /> : <OrderSummary orders={orders} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
