import { AllOrderList } from '../../../../../types/common';
import OrderSlideBottom from '../../OrderSlideBottom';
import OrderSlideOption from '../../OrderSlideOption';
import OrderSlideMiddle from '../../OrderSlideMiddle';

export default function PCOrderListSlideMiddle({ list }: { list: AllOrderList }) {
  return (
    <>
      <OrderSlideMiddle orderList={list.orderList} />
      <OrderSlideBottom list={list} />
      <OrderSlideOption list={list} />
    </>
  );
}
