import Loader from '../Loader';
import ConfirmModal from '../modal/ConfirmModal';
import CompletedOrderListSwiper from '../swiper/CompletedOrderListSwiper';
import OrderListSwiper from '../swiper/OrderListSwiper';
import { changeSubmitState } from '../../lib/features/submitState/submitSlice';
import useQueryAllOrderList from '../../lib/hook/useQuery/useQueryAllOrderList';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function MainPageOrderTab() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  const submitStatus = useSelector((state) => state.submitState.status);
  const selectedCategory = useSelector((state) => state.categoryState);
  // hook
  const { data, isLoading } = useQueryAllOrderList();
  // useDispatch
  const dispatch = useDispatch();
  // variant
  const doneOrderList = data?.filter((arr) => arr.isDone) ?? [];
  const notDoneOrderList = data?.filter((arr) => !arr.isDone) ?? [];
  const descDoneOrderList = [...doneOrderList].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  // 주문 탭이고 제출했을 때 동작
  useEffect(() => {
    if (tab === 'order' && submitStatus === 'fulfilled') {
      // 제출 false 변환
      dispatch(changeSubmitState({ isSubmit: false }));
    }
  }, [tab, submitStatus]);

  if (isLoading) return <Loader />;

  return (
    <>
      {selectedCategory.id === 0 ? (
        <OrderListSwiper orderList={notDoneOrderList} />
      ) : (
        <CompletedOrderListSwiper orderList={descDoneOrderList} />
      )}
      <ConfirmModal title={'주문'} />
    </>
  );
}
