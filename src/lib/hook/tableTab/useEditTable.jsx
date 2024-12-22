import { useDispatch, useSelector } from 'react-redux';
import { changeKonvaIsEditingState, getEditKonvaTableId } from '../../features/konvaState/konvaSlice';

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

  return { onClickEditTable };
}
