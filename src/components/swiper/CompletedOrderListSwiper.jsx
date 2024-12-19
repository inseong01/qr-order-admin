import styles from '@/style/swiper/CompletedOrderListSwiper.module.css';
import MiddleBox from '../middle/MiddleBox';
import { swiper_motion } from '../../lib/motion/motion_mainPageOrderTab';

import { motion } from 'motion/react';
import Swiper from 'swiper';
import { Pagination, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import { useEffect, useRef, useState } from 'react';

export default function CompletedOrderListSwiper({ orderList }) {
  const orderListRef = useRef(null);

  useEffect(() => {
    new Swiper(orderListRef.current, {
      modules: [Pagination, Grid],
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
        clickable: true,
      },
      grid: {
        fill: 'row',
        rows: 2,
      },
      slidesPerView: 1,
      spaceBetween: 20,
      breakpoints: {
        600: {
          slidesPerView: 2,
        },
        900: {
          slidesPerView: 3,
        },
        1100: {
          slidesPerView: 4,
        },
        1400: {
          slidesPerView: 5,
        },
        1700: {
          slidesPerView: 6,
        },
      },
    });
  }, []);

  return (
    <motion.div
      className={`orderList ${styles.completed}`}
      ref={orderListRef}
      variants={swiper_motion}
      initial={'notActive'}
      animate={'active'}
    >
      <ul className={`swiper-wrapper ${styles.listBox}`}>
        {orderList.map((list, idx) => {
          const amount = list.orderList.reduce((prev, curr) => prev + curr.amount, 0);
          return (
            <li key={idx} className={`swiper-slide ${styles.slide}`}>
              <div className={styles.list}>
                <div className={styles.topBox}>
                  <div className={styles.top}>
                    <div className={styles.title}>#{orderList.length - idx}</div>
                    <div className={styles.right}>
                      <div className={styles.table}>테이블 {list.tableNum}</div>
                    </div>
                  </div>
                </div>
                <MiddleBox orderList={list.orderList} />
                <div className={styles.bottomBox}>
                  <div className={styles.bottom}>
                    <div className={styles.totalMenuAmount}>
                      <span>{amount}</span> 개
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={`swiper-pagination ${styles.pagination}`}></div>
    </motion.div>
  );
}
