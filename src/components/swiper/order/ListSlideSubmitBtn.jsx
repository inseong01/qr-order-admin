import styles from '@/style/swiper/order/ListSlideSubmitBtn.module.css';
import { changeSubmitMsgType } from '../../../lib/features/submitState/submitSlice';
import { useBoundStore } from '../../../lib/store/useBoundStore';

import { useDispatch, useSelector } from 'react-redux';

export default function ListSlideSubmitBtn({ list }) {
  // useDispatch
  const dispatch = useDispatch();
  // store
  const selectedListId = useBoundStore((state) => state.itemBox.selectedListId);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const getListInfo = useBoundStore((state) => state.getListInfo);
  const changeSubmitMsgType = useBoundStore((state) => state.changeSubmitMsgType);

  const preventSubmit = false;

  function onClickUpdateListState(list) {
    return () => {
      // 제출 오류 있다면
      if (preventSubmit) return;
      const type = selectedListId === list.id ? 'delete' : 'complete';
      // dispatch(changeSubmitMsgType({ msgType: type }));
      changeSubmitMsgType({ msgType: type });
      changeModalState({ isOpen: true, type: 'update' });
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
