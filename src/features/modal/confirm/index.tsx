import { useAtom } from 'jotai';
import { AnimatePresence } from 'motion/react';

import { confirmModalAtom } from './store/atom';
import DialogLayout from './components/layout/layout';
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
          {/* 제목 */}
          <div className={styles.title}>{modalState.title}</div>

          {/* 선택 */}
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
