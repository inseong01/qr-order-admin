import { AllOrderList } from '../../../../../types/common';
import MobileOrderListSlideMiddle from './MobileOrderListSlideMiddle';
import PCOrderListSlideMiddle from './PCOrderListSlideMiddle';

export default function AdaptiveOrderListSlideMiddle({
  list,
  isExistId,
}: {
  list: AllOrderList;
  isExistId: boolean;
}) {
  const isMobileSize = window.innerWidth <= 720;

  return (
    <>
      {!isMobileSize ? (
        <PCOrderListSlideMiddle list={list} />
      ) : (
        <MobileOrderListSlideMiddle isExistId={isExistId} list={list} />
      )}
    </>
  );
}
