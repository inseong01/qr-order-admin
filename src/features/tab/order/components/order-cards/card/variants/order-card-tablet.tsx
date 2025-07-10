import { OrderItem } from '@/lib/supabase/function/order-item';
import { Order } from '@/lib/supabase/function/order';

import OrderCardItemList from '../components/order-card-item-list';
import OrderCardFooter from '../components/order-card-footer';

interface OrderCardTabletProps {
  orderItems: OrderItem[];
  order: Order;
}

export default function OrderCardTablet({ orderItems, order }: OrderCardTabletProps) {
  const shouldShowFooter = !order.is_done;

  return (
    <>
      {/* 주문 목록 */}
      <OrderCardItemList orderItems={orderItems} />

      {/* 주문 처리 버튼 */}
      {shouldShowFooter && <OrderCardFooter order={order} />}
    </>
  );
}
