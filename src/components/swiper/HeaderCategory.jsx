import styles from '@/style/swiper/HeaderCategorySwiper.module.css';
import { changeCategoryId } from '@/lib/features/categoryState/categorySlice';
import OrderCategoryAlert from '../top/OrderCategoryAlert';
import UnderLine from '../UnderLine';

import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

function HeaderCategoryBox({ list, children }) {
  // useSelector
  const categoryId = useSelector((state) => state.categoryState.id);
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  // useDispatch
  const dispatch = useDispatch();

  function onClickChangeTabCategory({ id, title }) {
    return () => {
      if (isModalOpen) return;
      if (categoryId == id) return;
      dispatch(changeCategoryId({ id, title }));
    };
  }

  return (
    <li className={`${styles.categoryBox} swiper-slide`}>
      <div
        className={`${categoryId === list.id ? styles.clicked : ''} ${styles.category}`}
        onClick={onClickChangeTabCategory(list)}
      >
        {children}
        <UnderLine list={list} selectedId={categoryId} position={'bottom'} />
      </div>
    </li>
  );
}

function TitleBox({ list }) {
  return (
    <motion.div className={styles.title} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
      {list.title} <OrderCategoryAlert title={list.title} />
    </motion.div>
  );
}

export default function HeaderCategory({ list }) {
  return (
    <HeaderCategoryBox list={list}>
      <TitleBox list={list} />
    </HeaderCategoryBox>
  );
}
