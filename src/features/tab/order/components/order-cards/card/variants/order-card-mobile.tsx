import { AnimatePresence, motion } from 'motion/react';

import { Order } from '@/lib/supabase/tables/order';

import OrderCardItemList from '../components/order-card-item-list';
import OrderCardFooter from '../components/order-card-footer';

interface OrderCardMobileProps {
  isClicked: boolean;
  order: Order;
}

export default function OrderCardMobile({ order, isClicked }: OrderCardMobileProps) {
  return (
    <AnimatePresence>
      {isClicked && (
        <motion.div
          key={'orderList'}
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          style={{ overflow: 'hidden' }}
        >
          {/* 주문 목록 */}
          <OrderCardItemList order={order} />

          {/* 주문 처리 버튼 */}
          <OrderCardFooter order={order} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
