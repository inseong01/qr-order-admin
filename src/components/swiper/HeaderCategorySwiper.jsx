import styles from '@/style/swiper/HeaderCategorySwiper.module.css';
import HeaderCategory from './HeaderCategory';

import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import 'swiper/css';

export default function HeaderCategorySwiper({ tabCategory }) {
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
        {tabCategory.map((list) => {
          return <HeaderCategory key={list.id} list={list} />;
        })}
      </ul>
    </div>
  );
}
