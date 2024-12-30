import styles from '@/style/top/HeaderLeft.module.css';
import { changeModalState } from '@/lib/features/modalState/modalSlice';

import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

// dynamic 추후 적용
export default function AddCategoryBox() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const submitError = useSelector((state) => state.submitState.isError);
  // useDispatch
  const dispatch = useDispatch();

  function onClickOpenModal() {
    if (isModalOpen || submitError) return;
    dispatch(changeModalState({ type: 'insert-category', isOpen: true }));
  }

  return (
    <>
      {tab === 'menu' && (
        <motion.div
          className={styles.addCategoryBox}
          onClick={onClickOpenModal}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.category}>
            <img src={'/img/category-add-icon.png'} alt="분류 추가" style={{ width: 15, height: 15 }} />
            <div className={styles.title}>분류</div>
          </div>
        </motion.div>
      )}
    </>
  );
}
