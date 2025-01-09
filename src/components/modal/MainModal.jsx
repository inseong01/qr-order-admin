import styles from '@/style/modal/MainModal.module.css';
import { changeModalState } from '@/lib/features/modalState/modalSlice';
import ModalFormState from './ModalFormState';

import { useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

export default function MainModal() {
  // useSelector
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  // dispatch
  const dispatch = useDispatch();
  // useRef
  const modalRef = useRef(null);

  function onClickCloseModal() {
    dispatch(changeModalState({ isOpen: false }));
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
