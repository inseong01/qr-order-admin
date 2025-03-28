import { AllOrderList } from '../../../types/common';
import OrderListSlides from './component/OrderListSlides';
import OrderListSwiperBox from './component/OrderListSwiperBox';

export default function OrderListSwiper({
  orderList,
  isDone,
}: {
  orderList: AllOrderList[];
  isDone?: boolean;
}) {
  return (
    <OrderListSwiperBox isDone={isDone}>
      <OrderListSlides orderList={orderList} />
    </OrderListSwiperBox>
  );
}
