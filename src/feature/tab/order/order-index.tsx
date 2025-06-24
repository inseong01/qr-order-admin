import { useEffect } from 'react';

import { useBoundStore } from '../../../lib/store/use-bound-store';

import { useQueryAllOrderList } from '../../../hook/use-query';

import ConfirmModal from '../../modal/confirm/confirm-modal';

import OrderListSwiper from './swiper/swiper-index';

export default function MainPageOrderTab() {
  const tab = useBoundStore((state) => state.tab.title);
  const submitStatus = useBoundStore((state) => state.submit.status);
  const selectedCategory = useBoundStore((state) => state.category);

  const { data, refetch } = useQueryAllOrderList();

  const isOrderToBeProcessed = selectedCategory.id === 0;
  const doneOrderList = data ? data.filter((arr) => arr.isDone) : [];
  const notDoneOrderList = data ? data.filter((arr) => !arr.isDone) : [];
  const notDoneListAsc = [...notDoneOrderList].sort((a, b) => a.orderNum - b.orderNum);
  const doneListDesc = [...doneOrderList].sort(
    (a, b) => new Date(b.updated_at as Date).getTime() - new Date(a.updated_at as Date).getTime()
  );

  useEffect(() => {
    if (tab !== 'order') return;
    if (submitStatus === 'fulfilled') {
      refetch();
    }
  }, [submitStatus]);

  return (
    <>
      {/* 주문목록 탭 */}
      {isOrderToBeProcessed ? (
        <OrderListSwiper orderList={notDoneListAsc} />
      ) : (
        <OrderListSwiper orderList={doneListDesc} />
      )}

      {/* 모달 */}
      <ConfirmModal title={'주문'} />
    </>
  );
}
