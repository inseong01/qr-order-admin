import Loader from '../Loader';
import ConfirmModal from '../modal/ConfirmModal';
import CompletedOrderListSwiper from '../swiper/CompletedOrderListSwiper';
import OrderListSwiper from '../swiper/OrderListSwiper';
import fetchOrderList from '../../lib/supabase/func/fetchOrderList';
import { changeSubmitState } from '../../lib/features/submitState/submitSlice';
import ErrorPage from '../ErrorPage';

import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { swiper_motion } from '../../lib/motion/motion_mainPageOrderTab';

export default function MainPageOrderTab() {
  // useSelector
  const tab = useSelector((state) => state.tabState.state);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  const selectedCategory = useSelector((state) => state.categoryState);
  const trigger = useSelector((state) => state.realtimeState.allOrderList.trigger);
  // useQueries
  const allOrderList = useQuery({
    queryKey: ['allOrderList', trigger],
    queryFn: () => fetchOrderList('select'),
    initialData: [],
  });
  // useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // 주문 탭이고 제출했을 때 동작
    if (tab !== 'order' && !isSubmit) return;
    dispatch(changeSubmitState({ isSubmit: false }));
  }, [tab, allOrderList]);

  // motion
  // const swiper_motion = {
  //   active: {
  //     y: 0,
  //     opacity: 1,
  //   },
  //   notActive: {
  //     y: -10,
  //     opacity: 0,
  //   },
  // };

  if (allOrderList.isError) return <ErrorPage compName={'MainPageOrderTab'} />;

  return (
    <>
      {selectedCategory.id === 1 ? (
        <>
          {allOrderList.data && !allOrderList.isFetching ? (
            <OrderListSwiper
              orderList={allOrderList.data.filter((list) => !list.isDone)}
              // swiper_motion={swiper_motion}
            />
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <>
          {allOrderList.data && !allOrderList.isFetching ? (
            <CompletedOrderListSwiper
              orderList={allOrderList.data.filter((list) => list.isDone)}
              // swiper_motion={swiper_motion}
            />
          ) : (
            <Loader />
          )}
        </>
      )}
      <ConfirmModal />
    </>
  );
}
