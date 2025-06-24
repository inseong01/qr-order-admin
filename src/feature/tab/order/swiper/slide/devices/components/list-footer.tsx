import { useBoundStore } from '../../../../../../../lib/store/use-bound-store';

import { AllOrderList } from '../../../../../../../types/common';

import styles from './list-footer.module.css';

export default function OrderListFooter({ list, id }: { list: AllOrderList; id: number }) {
  const isOrderPending = id === 0;
  const amount = list.orderList.reduce((prev, curr) => prev + curr.amount, 0);

  return (
    <div className={styles.bottomBox}>
      <div className={`${styles.bottom} ${id === 1 ? styles.done : ''}`}>
        {/* 수량 */}
        <div className={styles.totalMenuAmount}>
          <span>{amount}</span> 개
        </div>

        {/* 버튼 */}
        {isOrderPending && <OrderSlideSubmitBtn list={list} />}
      </div>
    </div>
  );
}

function OrderSlideSubmitBtn({ list }: { list: AllOrderList }) {
  const selectedListId = useBoundStore((state) => state.itemBox.selectedListId);
  const submitIsError = useBoundStore((state) => state.submit.isError);
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const getListInfo = useBoundStore((state) => state.getListInfo);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const changeSubmitMsgType = useBoundStore((state) => state.changeSubmitMsgType);

  const isSelectedList = selectedListId === list.id;
  const isMobileSize = window.innerWidth <= 720;

  function onClickUpdateListState(list: AllOrderList) {
    return () => {
      if (isSubmit) return; // 제출했다면
      if (submitIsError) return; // 제출 오류 있다면

      const type = selectedListId === list.id && !isMobileSize ? 'delete' : 'complete';
      changeSubmitMsgType({ msgType: type });
      changeModalState({ type: 'update', isOpen: true });
      getListInfo({ list });
    };
  }

  return (
    <div
      className={`${styles.completeBtn} ${!isMobileSize && isSelectedList ? styles.delete : ''}`}
      onClick={onClickUpdateListState(list)}
    >
      {!isMobileSize && isSelectedList ? '삭제' : '완료'}
    </div>
  );
}
