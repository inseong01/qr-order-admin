import { useBoundStore } from '../../../../lib/store/useBoundStore';
import { AllOrderList } from '../../../../types/common';
import OrderListSlide from './OrderListSlide';

import { useEffect, useState } from 'react';

export default function OrderListSlides({ orderList }: { orderList: AllOrderList[] }) {
  const isExistData = orderList.length === 0;

  return (
    <>
      {isExistData ? (
        <NotExistOrderListSlidesComponent />
      ) : (
        <ExistOrderListSlidesComponent orderList={orderList} />
      )}
    </>
  );
}

function NotExistOrderListSlidesComponent() {
  return <li>표시할 주문이 없습니다.</li>;
}

function ExistOrderListSlidesComponent({ orderList }: { orderList: AllOrderList[] }) {
  // state
  const [clickedArr, setClickedArr] = useState(['']);
  // store
  const selectedCategory = useBoundStore((state) => state.category);

  useEffect(() => {
    setClickedArr(['']);
  }, [selectedCategory.id]);
  return (
    <>
      {orderList.map((list, idx) => {
        return (
          <OrderListSlide
            key={idx}
            list={list}
            clickedArr={clickedArr}
            setClickedArr={setClickedArr}
          />
        );
      })}
    </>
  );
}
