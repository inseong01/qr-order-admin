import { useBoundStore } from '../../store/useBoundStore';

import Konva from 'konva';
import { RefObject } from 'react';

export default function useEditTable() {
  const konvaEditType = useBoundStore((state) => state.konva.type);
  const konvaEditTableIdArr = useBoundStore((state) => state.konva.target.id);
  const konvaEditIsEditing = useBoundStore((state) => state.konva.isEditing);
  const getEditKonvaTableId = useBoundStore((state) => state.getEditKonvaTableId);
  const changeKonvaIsEditingState = useBoundStore((state) => state.changeKonvaIsEditingState);

  // 테이블 편집 유형
  function onClickEditTable({ stageRef, id }: { stageRef: RefObject<Konva.Stage>; id: string }) {
    if (!stageRef.current) return;
    switch (konvaEditType) {
      case 'update': {
        stageRef.current.container().style.cursor = 'move';
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
