import Loader from '../Loader';
import ConfirmModal from '../modal/ConfirmModal';
import CompletedOrderListSwiper from '../swiper/CompletedOrderListSwiper';
import OrderListSwiper from '../swiper/OrderListSwiper';

import { useSelector } from 'react-redux';

export default function MainPageOrderTab({ allOrderList }) {
  // useSelector
  const selectedCategory = useSelector((state) => state.categoryState);

  // motion
  const swiper_motion = {
    active: {
      y: 0,
      opacity: 1,
    },
    notActive: {
      y: -10,
      opacity: 0,
    },
  };

  return (
    <>
      {selectedCategory.id === 1 ? (
        <>
          {allOrderList.data && !allOrderList.isFetching ? (
            <OrderListSwiper
              orderList={allOrderList.data.filter((list) => !list.isDone)}
              swiper_motion={swiper_motion}
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
              swiper_motion={swiper_motion}
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
