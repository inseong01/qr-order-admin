import { useAtom } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';

import { confirmModalAtom } from './store/atom';
import styles from './index.module.css';

export default function ConfirmModal() {
  const [modalState, setModalState] = useAtom(confirmModalAtom);

  const handleClose = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {
    modalState.onConfirm?.();
    handleClose();
  };

  return (
    <AnimatePresence>
      {modalState.isOpen && (
        <>
          <motion.dialog
            open
            className={styles.dialog}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{ translateX: '-50%', translateY: '-50%' }}
          >
            <div className={styles.title}>
              {/* 제목 */}
              {modalState.title}

              {/* 부제 */}
              {modalState.subTitle && (
                <div className={styles.subTitlteBox}>
                  <span className={`${styles.caption} ${styles.subTitlte}`} title={modalState.subTitle}>
                    &#91; {modalState.subTitle} &#93;
                  </span>
                  {modalState.caution && (
                    <span className={styles.caption}>
                      {modalState.caution.includes('일괄 삭제') ? (
                        <>
                          {modalState.caution.split('일괄 삭제')[0]}
                          <span className={styles.caution}>일괄 삭제</span>
                          {modalState.caution.split('일괄 삭제')[1]}
                        </>
                      ) : (
                        modalState.caution
                      )}
                    </span>
                  )}
                </div>
              )}
            </div>

            <ul className={styles.btnBox}>
              <li className={styles.btn} onClick={handleClose}>
                아니요
              </li>
              <li className={styles.btn} onClick={handleConfirm}>
                예
              </li>
            </ul>
          </motion.dialog>

          <motion.div
            className={styles.backdrop}
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
