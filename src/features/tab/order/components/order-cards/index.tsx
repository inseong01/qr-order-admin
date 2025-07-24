import { useRef } from 'react';
import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';

import { Order } from '@/lib/supabase/tables/order';
import { windowStateAtom } from '@/store/atom/window-atom';

import { swiper_motion } from './motion/variants';
import OrderCard from './card/order-card';
import styles from './index.module.css';

interface OrderCardsProps {
  orders: Order[];
  isDone?: boolean;
}

export default function OrderCards({ orders }: OrderCardsProps) {
  const { mainSection } = useAtomValue(windowStateAtom);
  const ordersRef = useRef<HTMLUListElement>(null);
  const ordersRefHeight = ordersRef.current?.offsetHeight ?? 0;
  const isDataEmpty = orders.length === 0;

  return (
    <motion.ul
      layout
      ref={ordersRef}
      className={styles.orders}
      variants={swiper_motion}
      initial={'notActive'}
      animate={'active'}
      style={{ height: ordersRefHeight >= mainSection.height ? '100%' : 'auto' }}
    >
      {isDataEmpty ? (
        <li>표시할 주문이 없습니다.</li>
      ) : (
        orders?.map((order) => <OrderCard key={order.id} order={order} />)
      )}
    </motion.ul>
  );
}
