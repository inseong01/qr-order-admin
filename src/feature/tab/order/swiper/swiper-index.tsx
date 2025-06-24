import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

import { useBoundStore } from '../../../../lib/store/use-bound-store';

import { AllOrderList } from '../../../../types/common';

import styles from './swiper-index.module.css';

import { swiper_motion } from './motion/variants';

import OrderListSlide from './slide/slide-index';

export default function OrderListSwiper({ orderList, isDone }: { orderList: AllOrderList[]; isDone?: boolean }) {
  const [clickedArr, setClickedArr] = useState(['']);

  const selectedCategory = useBoundStore((state) => state.category);

  const isExistData = orderList.length === 0;

  useEffect(() => {
    setClickedArr(['']);
  }, [selectedCategory.id]);

  return (
    <motion.ul
      className={`${styles.orderList} ${isDone ? styles.done : ''}`}
      variants={swiper_motion}
      initial={'notActive'}
      animate={'active'}
    >
      {isExistData ? (
        <li>표시할 주문이 없습니다.</li>
      ) : (
        <>
          {orderList.map((list, idx) => {
            return <OrderListSlide key={idx} list={list} clickedArr={clickedArr} setClickedArr={setClickedArr} />;
          })}
        </>
      )}
    </motion.ul>
  );
}
