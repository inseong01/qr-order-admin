import styles from '@/style/swiper/order/ListSlideSubmitBtn.module.css';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import { AllOrderList } from '../../../types/common';

export default function ListSlideSubmitBtn({ list }: { list: AllOrderList }) {
  // store
  const selectedListId = useBoundStore((state) => state.itemBox.selectedListId);
  const submitIsError = useBoundStore((state) => state.submit.isError);
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const getListInfo = useBoundStore((state) => state.getListInfo);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const changeSubmitMsgType = useBoundStore((state) => state.changeSubmitMsgType);

  function onClickUpdateListState(list: AllOrderList) {
    return () => {
      // 제출했다면
      if (isSubmit) return;
      // 제출 오류 있다면
      if (submitIsError) return;
      const type = selectedListId === list.id ? 'delete' : 'complete';
      changeSubmitMsgType({ msgType: type });
      changeModalState({ type: 'update', isOpen: true });
      getListInfo({ list });
    };
  }

  return (
    <div
      className={`${styles.completeBtn} ${selectedListId === list.id ? styles.delete : ''}`}
      onClick={onClickUpdateListState(list)}
    >
      {selectedListId === list.id ? '삭제' : '완료'}
    </div>
  );
}
