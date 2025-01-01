import { useDispatch, useSelector } from 'react-redux';
import { changeKonvaIsEditingState, getEditKonvaTableId } from '../../features/konvaState/konvaSlice';

export const initialMsgObj = {
  list: [],
  table: {},
  pos: { x: 0, y: 0, width: 30 },
};

export default function useEditTable() {
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const konvaEditType = useSelector((state) => state.konvaState.type);
  const konvaEditTableIdArr = useSelector((state) => state.konvaState.target.id);

  // 테이블 편집 유형
  function onClickEditTable({ stage, id }) {
    if (konvaEditType === 'update') {
      stage.current.container().style.cursor = 'move';
      dispatch(getEditKonvaTableId({ id: [id] }));
    } else if (konvaEditType === 'delete') {
      let filteredTableIdArr = [];

      // id 모음
      if (konvaEditTableIdArr.includes(id)) {
        filteredTableIdArr = konvaEditTableIdArr.filter((currId) => currId !== id);
      } else {
        filteredTableIdArr = [...konvaEditTableIdArr, id];
      }

      // id 배열로 편집 가능 여부 감지
      if (filteredTableIdArr.length <= 0) {
        dispatch(changeKonvaIsEditingState({ isEditing: false }));
      } else {
        dispatch(changeKonvaIsEditingState({ isEditing: true }));
      }

      dispatch(getEditKonvaTableId({ id: filteredTableIdArr }));
    }
  }

  // 요청 알림 읽음 처리
  function onClickReadRequestMsg({ hasAlert, getAlert, hoverTable }) {
    if (hasAlert) {
      // dispatch(fetchUpdateAlertMsg({ method: 'update', id }));
      getAlert(false);
      hoverTable(initialMsgObj);
      return;
    }
  }

  return { onClickEditTable, onClickReadRequestMsg };
}
