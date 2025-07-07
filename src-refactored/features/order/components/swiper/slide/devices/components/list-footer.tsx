import { useBoundStore } from '../../../../../../../lib/store/use-bound-store';

import { AllOrderList } from '../../../../../../../types/common';

import styles from './list-footer.module.css';

export default function OrderListFooter({ list }: { list: AllOrderList }) {
  return (
    <div className={styles.bottomBox}>
      <div className={styles.bottom}>
        {/* 삭제 */}
        <OrderSlideSubmitBtn list={list} type='delete' />

        {/* 완료 */}
        <OrderSlideSubmitBtn list={list} type='complete' />
      </div>
    </div>
  );
}

function OrderSlideSubmitBtn({ list, type }: { list: AllOrderList; type: 'delete' | 'complete' }) {
  const submitIsError = useBoundStore((state) => state.submit.isError);
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const getListInfo = useBoundStore((state) => state.getListInfo);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const changeSubmitMsgType = useBoundStore((state) => state.changeSubmitMsgType);

  function onClickUpdateListState(list: AllOrderList) {
    return () => {
      if (isSubmit) return; // 제출했다면
      if (submitIsError) return; // 제출 오류 있다면

      changeSubmitMsgType({ msgType: type });
      changeModalState({ type: 'update', isOpen: true });
      getListInfo({ list });
    };
  }

  return (
    <button
      type='button'
      className={`${styles.btn} ${type === 'delete' ? styles.delete : ''}`}
      onClick={onClickUpdateListState(list)}
    >
      {type === 'delete' ? '삭제' : '완료'}
    </button>
  );
}
