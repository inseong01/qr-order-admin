import styles from '@/style/swiper/HeaderCategorySwiper.module.css';
import { throttle } from '../../../lib/function/throttle';
import useScroll from '../../../lib/hook/useScroll';
import HeaderCategory from './HeaderCategory';

import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

export default function HeaderCategorySwiper() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  // useQueryClient
  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData(['categoryList', { tab }]);
  // useRef
  const headerleftSliderRef = useRef(null);
  // hook
  const { onDrag, onDragStart } = useScroll(headerleftSliderRef);

  return (
    <ul
      ref={headerleftSliderRef}
      className={styles.swiper}
      onDragStart={onDragStart}
      onDrag={throttle(onDrag, 15)}
      onDragEnd={onDrag}
      draggable
    >
      {categoryList?.map((list) => {
        return <HeaderCategory key={list.id} list={list} />;
      })}
    </ul>
  );
}
