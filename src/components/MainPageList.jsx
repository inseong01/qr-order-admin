'use client';

import styles from '@/style/MainPageList.module.css';

import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import MiddleBox from './MiddleBox';

const menuList = [
  { title: '음식 1', price: 1000 },
  { title: '음식 1', price: 1000 },
  { title: '음식 1', price: 1000 },
  { title: '음식 1', price: 1000 },
  { title: '음식 1', price: 1000 },
  { title: '음식 1', price: 1000 },
  { title: '음식 1', price: 1000 },
  { title: '음식 1', price: 1000 },
  { title: '음식 1', price: 1000 },
  { title: '음식 1', price: 1000 },
  { title: '음식 1', price: 1000 },
  { title: '음식 1', price: 1000 },
];

const menuPage = [
  [{ num: 0 }, { num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 5 }],
  [{ num: 5 }, { num: 6 }, { num: 7 }, { num: 8 }, { num: 9 }, { num: 10 }],
];

const orderList = [
  { title: '주문 1', totalPrice: '10,000', menuPage },
  { title: '주문 2', totalPrice: '10,000', menuPage },
  { title: '주문 3', totalPrice: '10,000', menuPage },
  { title: '주문 4', totalPrice: '10,000', menuPage },
  { title: '주문 5', totalPrice: '10,000', menuPage },
  { title: '주문 6', totalPrice: '10,000', menuPage },
  { title: '주문 7', totalPrice: '10,000', menuPage },
  { title: '주문 8', totalPrice: '10,000', menuPage },
  { title: '주문 9', totalPrice: '10,000', menuPage },
  { title: '주문 10', totalPrice: '10,000', menuPage },
];

const orderPagelist = [orderList, orderList];

export default function MainPageList({ type }) {
  const [mainListArr, setMainListArr] = useState(menuList);
  const [clickedNum, setclickedNum] = useState(null);
  const orderListRef = useRef(null);

  useEffect(() => {
    if (!orderListRef.current) return;

    const orderListSwiper = new Swiper(orderListRef.current, {
      modules: [Pagination],
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      spaceBetween: 10,
    });

    return () => {
      orderListSwiper.distory();
    };
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
          <ul className={`swiper-wrapper ${styles.listBox}`}>
            {orderPagelist.map((page, idx) => {
              return (
                <li key={idx} className={`swiper-slide ${styles.page}`}>
                  {page.map((orderList, i) => {
                    return (
                      <div key={i} className={styles.list} onClick={onClickOpenListOption(i)}>
                        <div className={styles.topBox}>
                          <div className={styles.top}>
                            <div className={styles.title}>#{i + 1}</div>
                            <div className={styles.right}>
                              <div className={styles.table}>테이블 1</div>
                              <div className={styles.time}>00:00</div>
                            </div>
                          </div>
                        </div>
                        <MiddleBox menuList={orderList.menuPage} />
                        <div className={styles.bottomBox}>
                          <div className={styles.bottom}>
                            <div className={styles.totalMenuAmount}>
                              <span>{1}</span> 개
                            </div>
                            <div className={`${styles.completeBtn} ${clickedNum === i ? styles.delete : ''}`}>
                              {clickedNum === i ? '삭제' : '완료'}
                            </div>
                          </div>
                        </div>
                        <AnimatePresence>
                          {clickedNum === i && (
                            <motion.ul
                              className={styles.listOptionBox}
                              initial={{ y: -30 }}
                              animate={{ y: 5 }}
                              exit={{ y: -30 }}
                            >
                              <li className={styles.option} onClick={onClickCloseOptionBox}>
                                <Image src={'/img/close-icon.png'} alt="옵션 닫기" width={30} height={30} />
                              </li>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </li>
              );
            })}
          </ul>
          <div className="swiper-pagination"></div>
        </div>
      );
    }
    case 'completed order': {
      return (
        <div className={`orderList ${styles.orderList} ${styles.completed}`} ref={orderListRef}>
          <ul className={`swiper-wrapper ${styles.listBox}`}>
            {orderPagelist.map((page, idx) => {
              return (
                <li key={idx} className={`swiper-slide ${styles.page}`}>
                  {page.map((orderList, i) => {
                    return (
                      <div key={i} className={styles.list}>
                        <div className={styles.topBox}>
                          <div className={styles.top}>
                            <div className={styles.title}>#{i + 1}</div>
                            <div className={styles.right}>
                              <div className={styles.table}>테이블 1</div>
                            </div>
                          </div>
                        </div>
                        <MiddleBox menuList={orderList.menuPage} />
                        <div className={styles.bottomBox}>
                          <div className={styles.bottom}>
                            <div className={styles.totalMenuAmount}>
                              <span>{1}</span> 개
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </li>
              );
            })}
          </ul>
          <div className="swiper-pagination"></div>
        </div>
      );
    }
  }
}
