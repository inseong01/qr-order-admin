import styles from '@/style/swiper/order/OrderListSwiper.module.css';
import { swiper_motion } from '../../../lib/motion/motion_mainPageOrderTab';
import { AllOrderList } from '../../../types/common';
import OrderListSlide from './OrderListSlide';

import { motion } from 'motion/react';

export default function OrderListSwiper({
  orderList,
  isDone,
}: {
  orderList: AllOrderList[];
  isDone?: boolean;
}) {
  return (
    <motion.ul
      className={`${styles.orderList} ${isDone ? styles.done : ''}`}
      variants={swiper_motion}
      initial={'notActive'}
      animate={'active'}
    >
      {orderList.map((list, idx) => {
        return <OrderListSlide key={idx} list={list} />;
      })}
    </motion.ul>
  );
}
