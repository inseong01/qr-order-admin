import { useAtomValue, useSetAtom } from 'jotai';
import { AnimatePresence } from 'motion/react';

import { idAtom } from '@/store/atom/id-atom';
import mockData from '@/mock/table.test.json';

import { tabModalAtom, tableToggleAtom } from '../store/atom';
import QRPreviewBox from './qr-code';
import ToggleDisplay from './toggle';
import OrderSummary from './order-summary';
import styles from './index.module.css';

export default function TableInfoPannel() {
  const setModal = useSetAtom(tabModalAtom);
  const tableId = useAtomValue(idAtom);
  const isToggled = useAtomValue(tableToggleAtom);

  function handleClose() {
    setModal(null);
  }

  const table = mockData.find((t) => t.id === tableId);

  return (
    <form className={styles.submitForm} onSubmit={() => {}}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          {/* 토글 */}
          <ToggleDisplay />

          <h2 className={styles.modalTitle}>{`테이블 ${table?.number}`}</h2>

          <button type='button' className={styles.close} onClick={handleClose}>
            <img src='' alt='close icon' />
          </button>
        </div>

        {/* 내용 */}
        <div className={styles.content}>
          <AnimatePresence mode='wait' initial={false}>
            {isToggled ? <QRPreviewBox tableNumber={table?.number} /> : <OrderSummary listData={[]} />}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
