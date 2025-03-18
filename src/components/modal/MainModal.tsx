import styles from '@/style/modal/MainModal.module.css';
import { useBoundStore } from '../../lib/store/useBoundStore';
import ModalFormState from './ModalFormState';

import { useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
              <FontAwesomeIcon icon={faXmark} size="lg" />
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
