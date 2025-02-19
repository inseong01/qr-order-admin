import styles from '@/style/swiper/header/HeaderCategorySwiper.module.css';
import { throttle } from '../../../lib/function/throttle';
import useScroll from '../../../lib/hook/useScroll';
import { MenuCategoryList } from '../../../types/common';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import HeaderCategory from './HeaderCategory';

import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export default function HeaderCategorySwiper() {
  // store
  const tab = useBoundStore((state) => state.tab.title);
  // useRef
  const headerleftSliderRef = useRef<HTMLUListElement>(null);
  // hook
  const { onDrag, onDragStart } = useScroll(headerleftSliderRef);
  // query
  const query = useQueryClient();
  const data = query.getQueryData(['categoryList', { tab }]) as MenuCategoryList[];

  return (
    <ul
      ref={headerleftSliderRef}
      className={styles.swiper}
      onDragStart={onDragStart}
      onDrag={throttle(onDrag, 15)}
      onDragEnd={onDrag}
      draggable
    >
      {data?.map((list) => {
        return <HeaderCategory key={list.id} list={list} />;
      })}
    </ul>
  );
}
