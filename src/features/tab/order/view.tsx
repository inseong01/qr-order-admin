import { useRef } from 'react';
import { motion } from 'motion/react';
import { useAtomValue } from 'jotai';

import { windowStateAtom } from '@/store/atom/window-atom';
import { useQueryOrderMenuList } from '@/hooks/use-query/query';
import { generateCardLayoutArr } from '@/utils/function/generate-card';

import orderItemMock from '@/mock/order-item.test.json';

import { useOrderTab } from './hooks/use-order-tab';
import { card_motion } from './motion/variants';
import Card from './components/card';
import styles from './view.module.css';

export default function OrderTabView() {
  const { orders } = useOrderTab();
  const { mainSection } = useAtomValue(windowStateAtom);
  const ordersRef = useRef<HTMLUListElement>(null);
  const isDataEmpty = orders.length === 0;
  const orderMenusQuery = useQueryOrderMenuList();
  const orderCardList = generateCardLayoutArr({
    orders,
    // orderItems: orderMenusQuery?.data ?? [],
    orderItems: orderItemMock,
    maxHeight: mainSection.height,
  });

  return (
    <motion.ul
      ref={ordersRef}
      className={styles.orders}
      variants={card_motion}
      initial={'notActive'}
      animate={'active'}
    >
      {isDataEmpty ? (
        <li>표시할 주문이 없습니다.</li>
      ) : (
        orderCardList?.map((order, idx) => <Card key={idx} order={order} />)
      )}
    </motion.ul>
  );
}
