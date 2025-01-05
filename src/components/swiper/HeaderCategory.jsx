import styles from '@/style/swiper/HeaderCategorySwiper.module.css';
import { changeCategoryId } from '@/lib/features/categoryState/categorySlice';
import OrderCategoryAlert from '../top/OrderCategoryAlert';
import UnderLine from '../UnderLine';

import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';

function HeaderCategoryBox({ list, children }) {
  // useSelector
  const categoryId = useSelector((state) => state.categoryState.id);
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  // useDispatch
  const dispatch = useDispatch();
  // useQueryClient
  const queryClient = useQueryClient();

  function onClickChangeTabCategory({ id, title }) {
    return async () => {
      if (isModalOpen) return;
      if (categoryId == id) return;
      // 해당 메뉴 카테고리 정보 변경, CSS/애니메이션 적용
      dispatch(changeCategoryId({ id, title }));
      // 메뉴 새로운 카테고리 ID로 데이터 패칭 요청
      await queryClient.refetchQueries({ queryKey: ['menuList', id] }, { throwOnError: true });
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
