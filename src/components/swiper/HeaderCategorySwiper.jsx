import styles from '@/style/swiper/HeaderCategorySwiper.module.css';
import { changeCategoryId } from '@/lib/features/categoryState/categorySlice';

import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swiper from 'swiper';
import 'swiper/css';

export default function HeaderCategorySwiper({ tabCategory, orderList }) {
  // useRef
  const headerleftSliderRef = useRef(null);
  // useSelector
  const categoryId = useSelector((state) => state.categoryState.id);
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  // useDispatch
  const dispatch = useDispatch();

  function onClickChangeTabCategory({ id, title }) {
    return () => {
      if (isModalOpen) return;
      dispatch(changeCategoryId({ id, title }));
    };
  }

  useEffect(() => {
    new Swiper(headerleftSliderRef.current, {
      slidesPerView: 2,
      breakpoints: {
        750: {
          slidesPerView: 3,
        },
      },
    });
  }, []);

  return (
    <div className={styles.swiper} ref={headerleftSliderRef}>
      <ul className="swiper-wrapper">
        {tabCategory.map((list, idx) => {
          return (
            <li key={idx} className={`${styles.categoryBox} swiper-slide`}>
              <motion.div
                className={`${categoryId === list.id ? styles.clicked : ''} ${styles.category}`}
                onClick={onClickChangeTabCategory(list)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className={styles.title}>
                  {list.title} {list.title === '접수' ? (orderList ? orderList.length : 0) : ''}
                </div>
              </motion.div>
              {categoryId === list.id && (
                <motion.div className={styles.line} layoutId="headerline"></motion.div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
