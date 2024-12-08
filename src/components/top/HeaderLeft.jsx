import styles from '@/style/top/HeaderLeft.module.css';
import { resetCategoryState } from '@/lib/features/categoryState/categorySlice';
import { changeModalState } from '@/lib/features/modalState/modalSlice';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderCategorySwiper from '../swiper/HeaderCategorySwiper';

export default function HeaderLeft({ tabCategory, tab, orderList }) {
  let title = '';
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const submitError = useSelector((state) => state.submitState.isError);

  useEffect(() => {
    // 탭 변경 시 동작
    dispatch(resetCategoryState());
  }, [tab]);

  function onClickOpenModal() {
    if (isModalOpen || submitError) return;
    dispatch(changeModalState({ type: 'category-add', isOpen: true }));
  }

  switch (tab) {
    case 'menu': {
      title = '분류';
      break;
    }
    case 'table': {
      break;
    }
    case 'order': {
      break;
    }
  }

  return (
    <AnimatePresence>
      {!tabCategory.isFetching ? (
        <div className={styles.left}>
          <HeaderCategorySwiper tabCategory={tabCategory.data} orderList={orderList} />
          {tab === 'menu' && (
            <div className={styles.addCategoryBox} onClick={onClickOpenModal}>
              <motion.div
                className={styles.category}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                key={'addBtn'}
              >
                <img src={'/img/add-icon.png'} alt="분류 추가" style={{ width: 15, height: 15 }} />
                <div className={styles.title}>{title}</div>
              </motion.div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.left}></div>
      )}
    </AnimatePresence>
  );
}
