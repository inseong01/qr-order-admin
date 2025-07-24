import { useAtom } from 'jotai';
import { AnimatePresence } from 'motion/react';

import DialogLayout from '@/components/layout/dialog';

import { confirmModalAtom } from './store/atom';
import styles from './index.module.css';

export default function ConfirmModal() {
  const [modalState, setModalState] = useAtom(confirmModalAtom);

  const handleClose = () => {
    modalState.onCancle?.();
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {
    modalState.onConfirm?.();
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AnimatePresence>
      {modalState.isOpen && (
        <DialogLayout handleClose={handleClose}>
          <div className={styles.title}>
            {/* 제목 */}
            {modalState.title}
          </div>

          <ul className={styles.btnBox}>
            <li className={styles.btn} onClick={handleClose}>
              아니요
            </li>
            <li className={styles.btn} onClick={handleConfirm}>
              예
            </li>
          </ul>
        </DialogLayout>
      )}
    </AnimatePresence>
  );
}
