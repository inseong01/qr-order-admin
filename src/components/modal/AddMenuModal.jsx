import styles from '@/style/modal/AddMenuModal.module.css';
import { resetItemState } from '@/lib/features/itemState/itemSlice';
import { changeModalState } from '@/lib/features/modalState/modalSlice';
import getTabCategory from '@/lib/supabase/func/getTabCategory';
import ModalFormState from './modalFormState';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

export default function AddMenuModal() {
  // useSelector
  const tab = useSelector((state) => state.tabState.state);
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  // dispatch
  const dispatch = useDispatch();
  // useRef
  const modalRef = useRef(null);
  // useQuery
  const categoryList = useQuery({
    queryKey: ['tabCategory', tab, isSubmit],
    queryFn: () => getTabCategory(tab),
    initialData: [{ title: '전체메뉴', id: 1 }],
  });

  function onClickCloseModal() {
    dispatch(changeModalState({ isOpen: false }));
    dispatch(resetItemState());
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
            {<ModalFormState categoryList={categoryList} />}
            <div className={styles.closeBtn} onClick={onClickCloseModal}>
              <img src={'/img/close.png'} alt="닫기" style={{ width: 20, height: 20 }} />
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
