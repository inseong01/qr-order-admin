import Loader from '../Loader';
import ConfirmModal from '../modal/ConfirmModal';
import CompletedOrderListSwiper from '../swiper/CompletedOrderListSwiper';
import OrderListSwiper from '../swiper/OrderListSwiper';
import { changeSubmitState } from '../../lib/features/submitState/submitSlice';
import fetchOrderList from '../../lib/supabase/func/fetchOrderList';

import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

export default function MainPageOrderTab() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  const submitStatus = useSelector((state) => state.submitState.status);
  const selectedCategory = useSelector((state) => state.categoryState);
  // useQueryClient
  const queryClient = useQueryClient();
  const allOrderList = useMemo(() => queryClient.getQueryData(['allOrderList']), [queryClient]);
  // useDispatch
  const dispatch = useDispatch();
  // variant
  const doneOrderList = useMemo(() => allOrderList?.filter((arr) => arr.isDone), [allOrderList]);
  const notDoneOrderList = useMemo(() => allOrderList?.filter((arr) => !arr.isDone), [allOrderList]);
  const descDoneOrderList =
    doneOrderList &&
    [...doneOrderList].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  // 주문 탭이고 제출했을 때 동작 (호출 중첩 원인)
  useEffect(() => {
    if (tab === 'order' && submitStatus === 'fulfilled') {
      // 제출 false 변환
      dispatch(changeSubmitState({ isSubmit: false }));
    }
  }, [tab, submitStatus]);

  if (!allOrderList) return <Loader />;

  return (
    <>
      {selectedCategory.id === 0 ? (
        <OrderListSwiper orderList={notDoneOrderList} />
      ) : (
        <CompletedOrderListSwiper orderList={descDoneOrderList} />
      )}
      <ConfirmModal />
    </>
  );
}
