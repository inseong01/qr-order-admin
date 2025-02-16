import { TableList } from '../../../types/common';
import { useBoundStore } from '../../store/useBoundStore';

export default function useOpenTableInfo() {
  // store
  const konvaEditType = useBoundStore((state) => state.konva.type);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const selectTable = useBoundStore((state) => state.selectTable);

  // 선택하면 모달 창 열림, 주문목록/금액, 결제/닫기 버튼, 결제
  function onClickOpenTableInfo({ table }: { table: TableList }) {
    if (konvaEditType === '') {
      // 모달창 상태 true 변환
      changeModalState({ type: 'info', isOpen: true });
      selectTable({ selectedTable: table });
      return;
    }
  }

  return { onClickOpenTableInfo };
}
