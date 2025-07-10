import { motion } from 'motion/react';

import { Order } from '@/lib/supabase/function/order';

import { swiper_motion } from './motion/variants';
import OrderCard from './card/order-card';
import styles from './index.module.css';

interface OrderCardsProps {
  orders: Order[];
  isDone?: boolean;
}

export default function OrderCards({ orders }: OrderCardsProps) {
  const isDataEmpty = orders.length === 0;

  return (
    <motion.ul className={styles.orders} variants={swiper_motion} initial={'notActive'} animate={'active'}>
      {isDataEmpty ? (
        <li>표시할 주문이 없습니다.</li>
      ) : (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      )}
    </motion.ul>
  );
}
