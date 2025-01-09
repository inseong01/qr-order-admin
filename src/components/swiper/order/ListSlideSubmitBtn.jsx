import styles from '@/style/swiper/order/ListSlideSubmitBtn.module.css';
import { changeSubmitMsgType } from '../../../lib/features/submitState/submitSlice';
import { getListInfo } from '../../../lib/features/itemState/itemSlice';
import { changeModalState } from '../../../lib/features/modalState/modalSlice';

import { useDispatch, useSelector } from 'react-redux';

export default function ListSlideSubmitBtn({ list }) {
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const selectedListId = useSelector((state) => state.itemState.selectedListId);
  const preventSubmit = useSelector((state) => state.submitState.isError);

  function onClickUpdateListState(list) {
    return () => {
      if (preventSubmit) return;
      const type = selectedListId === list.id ? 'delete' : 'complete';
      dispatch(changeSubmitMsgType({ msgType: type }));
      dispatch(changeModalState({ isOpen: true, type: 'update' }));
      dispatch(getListInfo({ list }));
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
