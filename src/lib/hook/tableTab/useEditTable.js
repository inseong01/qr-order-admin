import { changeKonvaIsEditingState, getEditKonvaTableId } from '../../features/konvaState/konvaSlice';

import { useDispatch, useSelector } from 'react-redux';

export default function useEditTable() {
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const konvaEditType = useSelector((state) => state.konvaState.type);
  const konvaEditTableIdArr = useSelector((state) => state.konvaState.target.id);
  const konvaEditIsEditing = useSelector((state) => state.konvaState.isEditing);

  // 테이블 편집 유형
  function onClickEditTable({ stage, id }) {
    switch (konvaEditType) {
      case 'update': {
        stage.current.container().style.cursor = 'move';
        // 좌석 연속 선택 방지
        if (id === konvaEditTableIdArr[0]) return;
        dispatch(getEditKonvaTableId({ id: [id] }));
        return;
      }
      case 'delete': {
        let filteredTableIdArr = [];
        // ID 모음
        if (konvaEditTableIdArr.includes(id)) {
          filteredTableIdArr = konvaEditTableIdArr.filter((currId) => currId !== id);
        } else {
          filteredTableIdArr = [...konvaEditTableIdArr, id];
        }
        // 선택 ID 전달
        dispatch(getEditKonvaTableId({ id: filteredTableIdArr }));
        // ID 배열로 편집 가능 여부 감지
        if (filteredTableIdArr.length <= 0) {
          dispatch(changeKonvaIsEditingState({ isEditing: false }));
          return;
        }
        // 상태 변경 제한
        if (konvaEditIsEditing) return;
        dispatch(changeKonvaIsEditingState({ isEditing: true }));
      }
    }
  }

  return { onClickEditTable };
}
