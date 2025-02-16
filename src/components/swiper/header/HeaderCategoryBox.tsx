import styles from '@/style/swiper/header/HeaderCategorySwiper.module.css';
import { MenuCategoryList } from '../../../types/common';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import UnderLine from '../../UnderLine';

import { useQueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';

export default function HeaderCategoryBox({
  list,
  children,
}: {
  list: MenuCategoryList;
  children: ReactNode;
}) {
  // useQueryClient
  const queryClient = useQueryClient();
  // store
  const categoryId = useBoundStore((state) => state.category.id);
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  const changeCategory = useBoundStore((state) => state.changeCategory);

  function onClickChangeTabCategory({ id, title }: MenuCategoryList) {
    return async () => {
      if (isModalOpen) return;
      if (categoryId == id) return;
      // 해당 메뉴 카테고리 정보 변경, CSS/애니메이션 적용
      changeCategory({ id, title });
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
