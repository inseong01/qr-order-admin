import styles from '@/style/swiper/order/OrderListSwiper.module.css';
import { swiper_motion } from '../../../../lib/motion/motion_mainPageOrderTab';

import { ReactNode } from 'react';
import { motion } from 'motion/react';

export default function OrderListSwiperBox({
  children,
  isDone,
}: {
  children: ReactNode;
  isDone?: boolean;
}) {
  return (
    <motion.ul
      className={`${styles.orderList} ${isDone ? styles.done : ''}`}
      variants={swiper_motion}
      initial={'notActive'}
      animate={'active'}
    >
      {children}
    </motion.ul>
  );
}
