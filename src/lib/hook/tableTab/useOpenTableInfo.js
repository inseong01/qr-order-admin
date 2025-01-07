import { changeModalState } from '../../features/modalState/modalSlice';
import { selectTable } from '../../features/itemState/itemSlice';

import { useDispatch, useSelector } from 'react-redux';

export default function useOpenTableInfo() {
  // useSelector
  const konvaEditType = useSelector((state) => state.konvaState.type);
  // useDispatch
  const dispatch = useDispatch();

  // 선택하면 모달 창 열림, 주문목록/금액, 결제/닫기 버튼, 결제
  function onClickOpenTableInfo({ table }) {
    if (konvaEditType === '') {
      // 모달창 상태 true 변환
      dispatch(changeModalState({ type: 'info', isOpen: true }));
      dispatch(selectTable({ table }));
      return;
    }
  }

  return { onClickOpenTableInfo };
}
