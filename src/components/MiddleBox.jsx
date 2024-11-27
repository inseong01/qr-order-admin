import styles from '@/style/MiddleBox.module.css';

import { useEffect, useRef } from 'react';
import { Pagination } from 'swiper/modules';
import Swiper from 'swiper';

export default function MiddleBox({ menuList }) {
  const middleBoxRef = useRef(null);

  useEffect(() => {
    if (!middleBoxRef.current) return;

    new Swiper(middleBoxRef.current, {
      modules: [Pagination],
      pagination: {
        el: '.middleBox-pagination',
        type: 'bullets',
      },
      spaceBetween: 10,
    });
  }, []);

  return (
    <div className={styles.middleBox}>
      <div className={styles.middleWrap} ref={middleBoxRef}>
        <ul className={`swiper-wrapper ${styles.middle}`}>
          {menuList.map((menu, idx) => {
            return (
              <li key={idx} className={`swiper-slide ${styles.menuBox}`}>
                {menu.map((menu, i) => {
                  return (
                    <div key={i} className={styles.menu}>
                      <div className={styles.title}>음식 {menu.num}</div>
                      <div className={styles.amount}>1</div>
                    </div>
                  );
                })}
              </li>
            );
          })}
        </ul>
        <div className={`middleBox-pagination ${styles.pagination}`}></div>
      </div>
    </div>
  );
}
