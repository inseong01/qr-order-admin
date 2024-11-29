'use client';

import styles from '@/style/swiper/OrderListSwiper.module.css';
import MiddleBox from '../middle/MiddleBox';

import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { Pagination, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/grid';

export default function OrderListSwiper({ allOrderList, swiper_motion }) {
  // useState
  const [clickedNum, setclickedNum] = useState(null);
  // useRef
  const orderListRef = useRef(null);

  useEffect(() => {
    if (!orderListRef.current) return;

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

  function onClickOpenListOption(idx) {
    // idx 추후에 주문목록 고유키로 변경
    return () => {
      setclickedNum(idx);
    };
  }

  function onClickCloseOptionBox(e) {
    e.stopPropagation();
    setclickedNum(() => null);
  }

  return (
    <motion.div
      className={`orderList ${styles.orderList}`}
      ref={orderListRef}
      variants={swiper_motion}
      initial={'notActive'}
      animate={'active'}
    >
      <ul className={`swiper-wrapper ${styles.listBox}`}>
        {allOrderList.map((list, idx) => {
          const amount = list.orderList.reduce((prev, curr) => prev + curr.amount, 0);
          return (
            <li key={idx} className={`swiper-slide ${styles.slide}`}>
              <div className={styles.list}>
                <div className={styles.topBox} onClick={onClickOpenListOption(idx)}>
                  <div className={styles.top}>
                    <div className={styles.title}>#{idx + 1}</div>
                    <div className={styles.right}>
                      <div className={styles.table}>테이블 1</div>
                      <div className={styles.time}>00:00</div>
                    </div>
                  </div>
                </div>
                <MiddleBox orderList={list.orderList} />
                <div className={styles.bottomBox}>
                  <div className={styles.bottom}>
                    <div className={styles.totalMenuAmount}>
                      <span>{amount}</span> 개
                    </div>
                    <div className={`${styles.completeBtn} ${clickedNum === idx ? styles.delete : ''}`}>
                      {clickedNum === idx ? '삭제' : '완료'}
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {clickedNum === idx && (
                    <motion.ul
                      className={styles.listOptionBox}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      style={{ y: 10 }}
                    >
                      <li className={styles.option} onClick={onClickCloseOptionBox}>
                        <Image src={'/img/close-icon.png'} alt="옵션 닫기" width={30} height={30} />
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={`swiper-pagination ${styles.pagination}`}></div>
    </motion.div>
  );
}
