import Loader from '../Loader';
import ConfirmModal from '../modal/ConfirmModal';
import CompletedOrderListSwiper from '../swiper/CompletedOrderListSwiper';
import OrderListSwiper from '../swiper/OrderListSwiper';
import fetchOrderList from '../../lib/supabase/func/fetchOrderList';
import { changeSubmitState } from '../../lib/features/submitState/submitSlice';
import ErrorPage from '../ErrorPage';

import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function MainPageOrderTab() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  const submitStatus = useSelector((state) => state.submitState.status);
  const selectedCategory = useSelector((state) => state.categoryState);
  // useSubscribeDBTable.jsx 에서 상태 변경됨
  // const trigger = useSelector((state) => state.realtimeState.allOrderList.trigger);
  // useQueries
  const allOrderList = useQuery({
    queryKey: ['allOrderList', { status: submitStatus }],
    queryFn: () => fetchOrderList('select'),
    initialData: [],
    enabled: (query) => {
      if (query.queryKey[1].status === '') return false;
      if (query.queryKey[1].status === 'pending') return false;
      return true;
    },
  });
  // useDispatch
  const dispatch = useDispatch();
  // useState
  const [sortedOrderList, sortOrder] = useState([]);
  // 주문 탭이고 제출했을 때 동작 (호출 중첩 원인)
  useEffect(() => {
    if (tab === 'order' && submitStatus === 'fulfilled') {
      dispatch(changeSubmitState({ isSubmit: false }));
    }
  }, [tab, submitStatus]);

  // 완료 주문 최신순 정렬 적용
  useEffect(() => {
    if (allOrderList.isFetching) return;
    const filteredArr = allOrderList.data.filter((arr) => arr.isDone);
    const descSortArr = [...filteredArr].sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
    sortOrder(descSortArr);
  }, [allOrderList.data, allOrderList.isFetching]);

  if (allOrderList.isError) return <ErrorPage compName={'MainPageOrderTab'} />;
  if (allOrderList.isFetching) return <Loader />;

  return (
    <>
      {selectedCategory.id === 0 ? (
        <OrderListSwiper orderList={allOrderList.data.filter((list) => !list.isDone)} />
      ) : (
        <CompletedOrderListSwiper orderList={sortedOrderList} />
      )}
      <ConfirmModal />
    </>
  );
}
