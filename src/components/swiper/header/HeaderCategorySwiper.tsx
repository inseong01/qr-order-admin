import styles from '@/style/swiper/header/HeaderCategorySwiper.module.css';
import useQueryCategoryList from '../../../lib/hook/useQuery/useQueryCategoryList';
import { throttle } from '../../../lib/function/throttle';
import useScroll from '../../../lib/hook/useScroll';
import HeaderCategory from './HeaderCategory';

import { useRef } from 'react';

export default function HeaderCategorySwiper() {
  // useRef
  const headerleftSliderRef = useRef<HTMLUListElement>(null);
  // hook
  const { onDrag, onDragStart } = useScroll(headerleftSliderRef);
  const { data } = useQueryCategoryList();

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
