import styles from '@/style/modal/MainModal.module.css';
import { useBoundStore } from '../../lib/store/useBoundStore';
import ModalFormState from './ModalFormState';

import { useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export default function MainModal() {
  // useRef
  const modalRef = useRef(null);
  // store
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  const changeModalState = useBoundStore((state) => state.changeModalState);

  function onClickCloseModal() {
    changeModalState({ isOpen: false });
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          <motion.dialog
            open={isModalOpen}
            className={styles.dialog}
            ref={modalRef}
            key={'dialog'}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{ translateX: '-50%', translateY: '-50%' }}
          >
            <ModalFormState />
            <div className={styles.closeBtn} onClick={onClickCloseModal}>
              <img src={'/img/close.webp'} alt="닫기" style={{ width: 20, height: 20 }} />
            </div>
          </motion.dialog>
          <motion.div
            className={styles.backdrop}
            key={'backdrop'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
