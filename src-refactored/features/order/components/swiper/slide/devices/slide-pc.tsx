import { useBoundStore } from '../../../../../../lib/store/use-bound-store';

import { AllOrderList } from '../../../../../../types/common';

import OrderListView from './components/list-view';
import OrderListFooter from './components/list-footer';

export default function OrderListSlideDesktop({ list }: { list: AllOrderList }) {
  const categoryId = useBoundStore((state) => state.category.id);

  return (
    <>
      {/* 주문목록 */}
      <OrderListView orderList={list.orderList} />

      {/* 푸터 */}
      {categoryId === 0 && <OrderListFooter list={list} />}
    </>
  );
}
