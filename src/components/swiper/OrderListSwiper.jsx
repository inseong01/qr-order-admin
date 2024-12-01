import styles from '@/style/swiper/OrderListSwiper.module.css';
import MiddleBox from '../middle/MiddleBox';
import updateOrderListStatus from '@/lib/supabase/func/updateOrderListStatus';
import { changeSubmitState } from '@/lib/features/submitState/submitSlice';

import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { Pagination, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import { useDispatch } from 'react-redux';

export default function OrderListSwiper({ orderList, swiper_motion, setUpdateState }) {
  // useState
  const [clickedItemId, setClickedItemId] = useState('');
  // useRef
  const orderListRef = useRef(null);
  // useDispatch
  const dispatch = useDispatch();

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

  function onClickOpenListOption(list) {
    // idx 추후에 주문목록 고유키로 변경
    return () => {
      setClickedItemId(list.id);
    };
  }

  function onClickCloseListOption(e) {
    e.stopPropagation();
    setClickedItemId('');
  }

  function onClickUpdateListStatus(list, selectedItemId) {
    return async () => {
      // id, 변경할 상태 조건 전달
      const data = await updateOrderListStatus(list, selectedItemId);
      console.log(data);
      if (data.error) return;
      dispatch(changeSubmitState({ isSubmit: true }));
      // setUpdateState((prev) => !prev);
    };
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
        {orderList.map((list, idx) => {
          const amount = list.orderList.reduce((prev, curr) => prev + curr.amount, 0);
          return (
            <li key={idx} className={`swiper-slide ${styles.slide}`}>
              <div className={styles.list}>
                <div className={styles.topBox} onClick={onClickOpenListOption(list)}>
                  <div className={styles.top}>
                    <div className={styles.title}>#{list.orderNum}</div>
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
                    <div
                      className={`${styles.completeBtn} ${clickedItemId === list.id ? styles.delete : ''}`}
                      onClick={onClickUpdateListStatus(list, clickedItemId)}
                    >
                      {clickedItemId === list.id ? '삭제' : '완료'}
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {clickedItemId === list.id && (
                    <motion.ul
                      className={styles.listOptionBox}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      style={{ y: 10 }}
                    >
                      <li className={styles.option} onClick={onClickCloseListOption}>
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
