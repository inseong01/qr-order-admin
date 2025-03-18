import styles from '@/style/swiper/order/OrderListSwiper.module.css';
import { swiper_motion } from '../../../lib/motion/motion_mainPageOrderTab';
import { AllOrderList } from '../../../types/common';
import OrderListSlide from './OrderListSlide';

import { motion } from 'motion/react';
import { useState } from 'react';

export default function OrderListSwiper({
  orderList,
  isDone,
}: {
  orderList: AllOrderList[];
  isDone?: boolean;
}) {
  // state
  const [clickedArr, setClickedArr] = useState(['']);

  return (
    <motion.ul
      className={`${styles.orderList} ${isDone ? styles.done : ''}`}
      variants={swiper_motion}
      initial={'notActive'}
      animate={'active'}
    >
      {orderList.length === 0 ? (
        <li>표시할 주문이 없습니다.</li>
      ) : (
        orderList.map((list, idx) => {
          return (
            <OrderListSlide
              key={idx}
              list={list}
              clickedArr={clickedArr}
              setClickedArr={setClickedArr}
            />
          );
        })
      )}
    </motion.ul>
  );
}
