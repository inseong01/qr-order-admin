'use client';

import styles from '@/style/swiper/CompletedOrderListSwiper.module.css';
import MiddleBox from '../MiddleBox';

import Swiper from 'swiper';
import { Pagination, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import { useEffect, useRef } from 'react';

export default function CompletedOrderListSwiper({ allOrderList }) {
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
      slidesPerView: 4,
      spaceBetween: 10,
    });
  }, []);

  return (
    <div className={`orderList ${styles.completed}`} ref={orderListRef}>
      <ul className={`swiper-wrapper ${styles.listBox}`}>
        {allOrderList.map((list, idx) => {
          const amount = list.orderList.reduce((prev, curr) => prev + curr.amount, 0);
          return (
            <li key={idx} className={`swiper-slide ${styles.slide}`}>
              <div className={styles.list}>
                <div className={styles.topBox}>
                  <div className={styles.top}>
                    <div className={styles.title}>#{idx + 1}</div>
                    <div className={styles.right}>
                      <div className={styles.table}>테이블 1</div>
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
    </div>
  );
}
