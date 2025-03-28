import { useBoundStore } from '../../../../lib/store/useBoundStore';
import { AllOrderList } from '../../../../types/common';
import AdaptiveOrderListSlideMiddle from './middle/AdaptiveOrderListSlideMiddle';
import OrderListSlideTop from './top/OrderListSlideTop';
import OrderListSlideBox from './OrderListSlideBox';

import { Dispatch, SetStateAction, useState } from 'react';

export default function OrderListSlide({
  list,
  clickedArr,
  setClickedArr,
}: {
  list: AllOrderList;
  clickedArr: string[];
  setClickedArr: Dispatch<SetStateAction<string[]>>;
}) {
  // store
  const categoryId = useBoundStore((state) => state.category.id);
  const submitError = useBoundStore((state) => state.submit.isError);
  const getSelectedListId = useBoundStore((state) => state.getSelectedListId);
  // variant
  const isExistId = clickedArr.includes(list.id);
  const manageDragging = useState(false);

  function onClickOrderList(list: AllOrderList) {
    return () => {
      if (manageDragging[0]) return;

      if (submitError) return;

      if (categoryId === 0) {
        getSelectedListId({ selectedListId: list.id });
      }

      // 선택한 주문 목록 확인
      setClickedArr((prev) => {
        if (isExistId) {
          return prev.filter((arg) => arg !== list.id);
        }
        return [...prev, list.id];
      });
    };
  }

  return (
    <OrderListSlideBox list={list} clickedArr={clickedArr} manageDragging={manageDragging}>
      <OrderListSlideTop list={list} onClickOrderList={onClickOrderList} />
      <AdaptiveOrderListSlideMiddle list={list} isExistId={isExistId} />
    </OrderListSlideBox>
  );
}
