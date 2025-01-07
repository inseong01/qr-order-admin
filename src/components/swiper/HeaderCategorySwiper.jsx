import styles from '@/style/swiper/HeaderCategorySwiper.module.css';
import HeaderCategory from './HeaderCategory';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Swiper from 'swiper';
import 'swiper/css';

export default function HeaderCategorySwiper() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  // useQueryClient
  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData(['categoryList', { tab }]);
  // useRef
  const headerleftSliderRef = useRef(null);

  useEffect(() => {
    const swiper = new Swiper(headerleftSliderRef.current, {
      slidesPerView: 2,
      breakpoints: {
        750: {
          slidesPerView: 3,
        },
      },
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <div className={styles.swiper} ref={headerleftSliderRef}>
      <ul className="swiper-wrapper">
        {categoryList?.map((list) => {
          return <HeaderCategory key={list.id} list={list} />;
        })}
      </ul>
    </div>
  );
}
