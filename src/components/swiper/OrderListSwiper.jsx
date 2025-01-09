import styles from '@/style/swiper/OrderListSwiper.module.css';
import OrderListSlide from './order/OrderListSlide';
import { swiper_motion } from '../../lib/motion/motion_mainPageOrderTab';

import { motion } from 'motion/react';

export default function OrderListSwiper({ orderList, isDone }) {
  return (
    <>
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
    </>
  );
}
