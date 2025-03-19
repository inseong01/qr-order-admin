import useQueryAllOrderList from '../../../lib/hook/useQuery/useQueryAllOrderList';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import OrderListSwiper from '../../swiper/order/OrderListSwiper';

import { useEffect } from 'react';

export default function OrderSection() {
  // store
  const tab = useBoundStore((state) => state.tab.title);
  const submitStatus = useBoundStore((state) => state.submit.status);
  const selectedCategory = useBoundStore((state) => state.category);
  // hook
  const { data, refetch } = useQueryAllOrderList();
  // variant
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
      {isOrderToBeProcessed ? (
        <OrderListSwiper orderList={notDoneListAsc} />
      ) : (
        <OrderListSwiper orderList={doneListDesc} />
      )}
    </>
  );
}
