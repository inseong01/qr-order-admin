import { Order } from '@/lib/supabase/function/order';

import OrderCardItemList from '../components/order-card-item-list';
import OrderCardFooter from '../components/order-card-footer';

export default function OrderCardTablet({ order }: { order: Order }) {
  const shouldShowFooter = !order.is_done;

  return (
    <>
      {/* 주문 목록 */}
      <OrderCardItemList order={order} />

      {/* 주문 처리 버튼 */}
      {shouldShowFooter && <OrderCardFooter order={order} />}
    </>
  );
}
