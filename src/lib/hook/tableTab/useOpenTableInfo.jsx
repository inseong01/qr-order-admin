import { useDispatch } from 'react-redux';
import { changeModalState } from '../../features/modalState/modalSlice';
import { selectTable } from '../../features/itemState/itemSlice';

export default function useOpenTableInfo() {
  const dispatch = useDispatch();

  // 선택하면 모달 창 열림, 주문목록/금액, 결제/닫기 버튼, 결제
  function onClickOpenTableInfo({ hasAlert, konvaEditType, table }) {
    if (!hasAlert && konvaEditType === '') {
      // 모달창 상태 true 변환
      dispatch(changeModalState({ type: 'info', isOpen: true }));
      dispatch(selectTable({ table }));
      return;
    }
  }

  return { onClickOpenTableInfo };
}
