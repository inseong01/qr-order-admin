import { ReactNode } from 'react';
import { motion } from 'motion/react';

import { Order } from '@/lib/supabase/function/order';
import orderItemsDummy from '@/mock/order_item.test.json';
import tableDummy from '@/mock/table.test.json';

import { useOrderCard } from './hooks/use-order-card';

import OrderCardTablet from './variants/order-card-tablet';
import OrderCardMobile from './variants/order-card-mobile';
import styles from './order-card.module.css';

export default function OrderCard({ order }: { order: Order }) {
  const { isDragging, setDragState, isSlideClicked, isMobileSize, selectSlide } = useOrderCard(order);

  const orderItems = orderItemsDummy.filter((o) => o.order_id === order.id);
  const table = tableDummy.find((t) => t.id === order.table_id);
  const isDoneString = `${order.is_done}`;

  return (
    <OrderCardContainer setDragState={setDragState}>
      <div className={styles.topBox} onClick={selectSlide} data-is-completed={isDoneString}>
        <div className={styles.top}>
          <div className={styles.title}>#{order.order_number}</div>
          <div className={styles.right}>
            <div className={styles.table}>테이블 {table?.number}</div>
          </div>
        </div>
      </div>

      {isMobileSize ? (
        <OrderCardMobile isSlideClicked={isSlideClicked} orderItems={orderItems} order={order} />
      ) : (
        <OrderCardTablet orderItems={orderItems} order={order} />
      )}
    </OrderCardContainer>
  );
}

interface OrderCardContainerProps {
  children: ReactNode;
  setDragState: (isDragging: boolean) => void;
}

function OrderCardContainer({ children, setDragState }: OrderCardContainerProps) {
  // TODO: 드래그 기능 구현 시 아래 로직 사용
  // const { /* ... */ } = useOrderCardDrag();

  return (
    <motion.li
      className={styles.slide}
      // drag={isMobile ? 'x' : false}
      transition={{ duration: 0.5 }}
      dragConstraints={{ left: 0, right: 0 }}
      // onDragStart={() => setDragState(true)}
      // onDragEnd={() => { /* 드래그 종료 로직 */ }}
      // onDragTransitionEnd={() => setDragState(false)}
    >
      {children}
    </motion.li>
  );
}
