import { useBoundStore } from '../../store/useBoundStore';

export default function useEditTable() {
  // store
  const konvaEditType = useBoundStore((state) => state.konva.type);
  const konvaEditTableIdArr = useBoundStore((state) => state.konva.target.id);
  const konvaEditIsEditing = useBoundStore((state) => state.konva.isEditing);
  const getEditKonvaTableId = useBoundStore((state) => state.getEditKonvaTableId);
  const changeKonvaIsEditingState = useBoundStore((state) => state.changeKonvaIsEditingState);

  // 테이블 편집 유형
  function onClickEditTable({ stage, id }) {
    switch (konvaEditType) {
      case 'update': {
        stage.current.container().style.cursor = 'move';
        // 좌석 연속 선택 방지
        if (id === konvaEditTableIdArr[0]) return;
        getEditKonvaTableId({ id: [id] });
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
        getEditKonvaTableId({ id: filteredTableIdArr });
        // ID 배열로 편집 가능 여부 감지
        if (filteredTableIdArr.length <= 0) {
          changeKonvaIsEditingState({ isEditing: false });
          return;
        }
        // 상태 변경 제한
        if (konvaEditIsEditing) return;
        changeKonvaIsEditingState({ isEditing: true });
      }
    }
  }

  return { onClickEditTable };
}
