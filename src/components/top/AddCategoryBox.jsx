import styles from '@/style/top/HeaderLeft.module.css';
import { useBoundStore } from '../../lib/store/useBoundStore';

import { motion } from 'motion/react';

export default function AddCategoryBox() {
  // store
  const tab = useBoundStore((state) => state.tab.title);
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  const submitError = useBoundStore((state) => state.submit.isError);
  const changeModalState = useBoundStore((state) => state.changeModalState);

  function onClickOpenModal() {
    if (isModalOpen || submitError) return;
    changeModalState({ type: 'insert-category', isOpen: true });
  }

  return (
    <>
      {tab === 'menu' && (
        <motion.div
          className={styles.addCategoryBox}
          onClick={onClickOpenModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className={styles.category}>
            <img src={'/img/category-add-icon.webp'} alt="분류 추가" style={{ width: 15, height: 15 }} />
            <div className={styles.title}>분류</div>
          </div>
        </motion.div>
      )}
    </>
  );
}
