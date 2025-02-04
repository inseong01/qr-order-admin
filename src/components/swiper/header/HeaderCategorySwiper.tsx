import styles from '@/style/swiper/header/HeaderCategorySwiper.module.css';
import { throttle } from '../../../lib/function/throttle';
import useScroll from '../../../lib/hook/useScroll';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import HeaderCategory from './HeaderCategory';

import { useQueryClient } from '@tanstack/react-query';
import { MutableRefObject, useRef } from 'react';
import { Tables } from '../../../../database.types';

export default function HeaderCategorySwiper() {
  // useRef
  const headerleftSliderRef: MutableRefObject<HTMLUListElement | null> = useRef(null);
  // hook
  const { onDrag, onDragStart } = useScroll(headerleftSliderRef);
  // store
  const tab = useBoundStore((state) => state.tab.title);
  // useQueryClient
  const queryClient = useQueryClient();
  const categoryList: Tables<'qr-order-category-menu'>[] | undefined = queryClient.getQueryData([
    'categoryList',
    { tab },
  ]);

  return (
    <ul
      ref={headerleftSliderRef}
      className={styles.swiper}
      onDragStart={onDragStart}
      onDrag={throttle(onDrag, 15)}
      onDragEnd={onDrag}
      draggable
    >
      {categoryList?.map((list: Tables<'qr-order-category-menu'>) => {
        return <HeaderCategory key={list.id} list={list} />;
      })}
    </ul>
  );
}
