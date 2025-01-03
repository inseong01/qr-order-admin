import styles from '@/style/modal/ConfirmModal.module.css';
import { fetchOrderListStatus } from '../../lib/features/submitState/submitSlice';
import { changeModalState } from '../../lib/features/modalState/modalSlice';
import { resetItemState } from '@/lib/features/itemState/itemSlice';

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'motion/react';

export default function ConfirmModal() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  const orderList = useSelector((state) => state.itemState.list);
  const submitStatus = useSelector((state) => state.submitState.status);
  const submitMsgType = useSelector((state) => state.submitState.msgType);
  const context = submitMsgType === 'delete' ? '삭제' : '완료';
  // useRef
  const modalRef = useRef(null);
  // useSelector
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  // useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (tab === 'order' && submitStatus !== 'fulfilled') return;
    dispatch(resetItemState());
  }, [submitStatus]);

  function onClickChangeModalStatus(state) {
    return () => {
      switch (state) {
        case 'no': {
          dispatch(changeModalState({ isOpen: false }));
          return;
        }
        case 'yes': {
          dispatch(fetchOrderListStatus({ method: submitMsgType, data: orderList }));
          dispatch(changeModalState({ isOpen: false }));
          return;
        }
      }
    };
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          <motion.dialog
            open={isModalOpen}
            className={styles.dialog}
            ref={modalRef}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{ translateX: '-50%', translateY: '-50%' }}
          >
            <div className={styles.title}>주문을 {context}하시겠습니까?</div>
            <ul className={styles.btnBox}>
              <li className={styles.btn} onClick={onClickChangeModalStatus('no')}>
                아니요
              </li>
              <li className={styles.btn} onClick={onClickChangeModalStatus('yes')}>
                예
              </li>
            </ul>
          </motion.dialog>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
