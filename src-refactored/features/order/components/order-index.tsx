import { useEffect } from 'react';

import { useBoundStore } from '../../../../lib/store/use-bound-store';

import { useQueryAllOrderList } from '../../../../hooks/use-query/query';

import ConfirmModal from '../../../modal/confirm/confirm-modal';

import OrderListSwiper from './swiper/swiper-index';

export default function MainPageOrderTab() {
  // const tab = useBoundStore((state) => state.tab.title);
  const submitStatus = useBoundStore((state) => state.submit.status);
  const selectedCategory = useBoundStore((state) => state.category);

  const { data, refetch } = useQueryAllOrderList();

  const isAcceptedOrderCategory = selectedCategory.id === 0;
  const doneOrderList = data
    .filter((arr) => arr.isDone)
    .sort((a, b) => new Date(b.updated_at as Date).getTime() - new Date(a.updated_at as Date).getTime());
  const notDoneOrderList = data
    .filter((arr) => !arr.isDone)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  useEffect(() => {
    // if (tab !== 'order') return;
    if (submitStatus === 'fulfilled') {
      refetch();
    }
  }, [submitStatus]);

  return (
    <>
      {/* 주문목록 탭 */}
      {isAcceptedOrderCategory ? (
        <OrderListSwiper orderList={notDoneOrderList} />
      ) : (
        <OrderListSwiper orderList={doneOrderList} />
      )}

      {/* 모달 */}
      <ConfirmModal title={'주문'} />
    </>
  );
}
