import { useAtom } from 'jotai';
import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';

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

type DialogLayoutProps = {
  children: ReactNode;
  handleClose: () => void;
  isScaleUp?: boolean;
};

function DialogLayout({ children, handleClose, isScaleUp = true }: DialogLayoutProps) {
  return (
    <>
      <motion.dialog
        open
        className={styles.dialog}
        initial={{ scale: isScaleUp ? 0.85 : 1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: isScaleUp ? 0.85 : 1, opacity: 0 }}
        style={{ translateX: '-50%', translateY: '-50%' }}
      >
        {children}
      </motion.dialog>

      <motion.div
        className={styles.backdrop}
        onClick={handleClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      ></motion.div>
    </>
  );
}
