import { useBoundStore } from '../../store/useBoundStore';

export default function useOnMouseChangeCursor(stage, table) {
  // store
  const konvaEditTableIdArr = useBoundStore((state) => state.konva.target.id);
  const konvaEditType = useBoundStore((state) => state.konva.type);
  // variant
  const { id } = table;
  const isTransformerAble = id === konvaEditTableIdArr[0] && konvaEditType !== 'delete';

  // 커서 테이블 아웃
  function onMouseLeaveChangePointer() {
    stage.current.container().style.cursor = 'default';
  }
  // 커서 테이블 인
  function onMouseEnterChangePointer() {
    // 좌석 편집 활성화
    if (isTransformerAble) {
      stage.current.container().style.cursor = 'move';
      return;
    }
    // 기본 커서 
    stage.current.container().style.cursor = 'pointer';
  }

  return { onMouseLeaveChangePointer, onMouseEnterChangePointer };
}
