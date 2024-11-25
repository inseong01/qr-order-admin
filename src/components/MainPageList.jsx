'use client';

import styles from '@/style/MainPageList.module.css';

import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const mainlist = [
  { title: '음식 1', price: '10,000' },
  { title: '음식 1', price: '10,000' },
  { title: '음식 1', price: '10,000' },
  { title: '음식 1', price: '10,000' },
  { title: '음식 1', price: '10,000' },
  { title: '음식 1', price: '10,000' },
  { title: '음식 1', price: '10,000' },
  { title: '음식 1', price: '10,000' },
  { title: '음식 1', price: '10,000' },
  { title: '음식 1', price: '10,000' },
];

const orderListArr = [
  [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 5 }],
  [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 5 }],
  [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 5 }],
  [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 5 }],
  [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 5 }],
  [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 5 }],
];

const orderList = [...orderListArr, ...orderListArr, ...orderListArr, ...orderListArr];

export default function MainPageList() {
  const [mainListArr, setMainListArr] = useState(mainlist);
  const middleBoxRef = useRef(null);
  const orderListRef = useRef(null);
  const type = 'order';

  useEffect(() => {
    // if (!orderListRef.current && !middleBoxRef.current) return;

    // const orderListSwiper = new Swiper(orderListRef.current, {
    //   modules: [Pagination],
    //   pagination: {
    //     el: '.swiper-pagination',
    //     type: 'bullets',
    //   },
    //   // slidesPerView: 1,
    // });

    const middleBoxSwiper = new Swiper(middleBoxRef.current, {
      modules: [Pagination],
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
    });

    return () => {
      orderListSwiper.distory();
      middleBoxSwiper.distory();
    };
  }, [middleBoxRef, orderListRef]);

  switch (type) {
    case 'table': {
      return (
        <ul className={styles.listBox}>
          {mainListArr.map((list, idx) => {
            return (
              <li key={idx} className={styles.list}>
                <div className={styles.topBox}>
                  <div className={styles.top}>
                    <div className={styles.title}>{list.title}</div>
                  </div>
                </div>
                <div className={styles.bottomBox}>
                  <div className={styles.bottom}>
                    <div className={styles.price}>{list.price}원</div>
                  </div>
                </div>
              </li>
            );
          })}
          <li className={`${styles.list} ${styles.addBtn}`}>
            <Image src={'/img/add-icon.png'} alt="상품 추가" width={30} height={30} />
            <div className="title">상품 추가</div>
          </li>
        </ul>
      );
    }
    case 'order': {
      return (
        <div className={`orderList ${styles.orderList}`} ref={orderListRef}>
          <ul className={`${styles.listBox} ${styles.order}`}>
            {orderList.map((pageArr, idx) => {
              return (
                <div key={idx}>
                  {pageArr.map((page, i) => {
                    return (
                      <li key={i} className={`${styles.list}`}>
                        <div className={styles.topBox}>
                          <div className={styles.top}>
                            <div className={styles.left}>
                              <div className={styles.title}>#{i + 1}</div>
                            </div>
                            <div className={styles.right}>
                              <div className={styles.table}>테이블 {i + 1}</div>
                              <div className={styles.time}>00:00</div>
                            </div>
                          </div>
                        </div>
                        {/* <div className={`middleBoxWrap ${styles.middleBoxWrap}`} ref={middleBoxRef}>
                        <div className={`middleBox ${styles.middleBox}`} ref={middleBoxRef}>
                          <ul className={`swiper-wrapper ${styles.middle}`}>
                          {list.map((menu, j) => {
                            return (
                              <li className={`swiper-slide ${styles.slide}`} key={j}>
                              {list.map((li, k) => {
                                return <div key={k}>{menu.num}</div>;
                                })}
                                </li>
                                );
                                })}
                                </ul>
                                <div className="swiper-pagination"></div>
                                </div>
                      </div> */}
                        <div className={styles.bottomBox}>
                          <div className={styles.bottom}>
                            <div className={styles.total}>
                              <span>00</span>개
                            </div>
                            <div className={styles.completeBtn}>완료</div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </div>
              );
            })}
          </ul>
        </div>
      );
    }
  }
}
