import styles from '@/style/swiper/HeaderCategorySwiper.module.css';
import { changeCategoryId } from '../../../lib/features/categoryState/categorySlice';
import UnderLine from '../../UnderLine';

import { useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

export default function HeaderCategoryBox({ list, children }) {
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
    <li className={styles.categorySlide}>
      <div
        className={`${categoryId === list.id ? styles.clicked : ''} ${styles.category}`}
        onClick={onClickChangeTabCategory(list)}
      >
        {children}
        <UnderLine tab={list} selectedId={categoryId} position={'bottom'} />
      </div>
    </li>
  );
}
