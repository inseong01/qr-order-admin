import styles from '@/style/MiddleBox.module.css';

import { useEffect, useRef } from 'react';
import { Grid, Pagination } from 'swiper/modules';
import Swiper from 'swiper';
import 'swiper/css/grid';

export default function MiddleBox({ orderList }) {
  const middleBoxRef = useRef(null);

  useEffect(() => {
    if (!middleBoxRef.current) return;

    new Swiper(middleBoxRef.current, {
      modules: [Pagination, Grid],
      pagination: {
        el: '.middleBox-pagination',
        type: 'bullets',
      },
      grid: {
        rows: 5,
      },
      spaceBetween: 10,
    });
  }, []);

  return (
    <div className={styles.middleBox}>
      <div className={styles.middleWrap} ref={middleBoxRef}>
        <ul className={`swiper-wrapper ${styles.middle}`}>
          {orderList.map((menu, idx) => {
            return (
              <li key={idx} className={`swiper-slide ${styles.menuBox}`}>
                <div className={styles.menu}>
                  <div className={styles.title}>{menu.name}</div>
                  <div className={styles.amount}>{menu.amount}</div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={`middleBox-pagination ${styles.pagination}`}></div>
      </div>
    </div>
  );
}
