import { useSelector } from 'react-redux';

export default function useSetTable(stage, shapeRef, setClientTableList) {
  // useSelector
  const konvaEditTableIdArr = useSelector((state) => state.konvaState.target.id);
  // variant
  const blockSize = 10;

  // 변경된 좌석 위치 적용
  function changeTablePosition(e) {
    // 커서 모양 변경
    stage.current.container().style.cursor = 'move';
    // 마지막 위치
    const lastPos = e.target.position();
    // 이동한 좌석 위치 변경
    setClientTableList((prev) =>
      prev.map((table) => {
        if (table.id === konvaEditTableIdArr[0]) {
          let newPosX = lastPos.x;
          let newPosY = lastPos.y;
          return { ...table, init: { ...table.init, x: newPosX, y: newPosY } };
        }
        return table;
      })
    );
  }

  function onDragTransform() {
    // 크기 변형 적용 객체
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    // node 초기화
    node.scaleX(1);
    node.scaleY(1);
    // 크기 변환 적용
    setClientTableList((prev) => {
      return prev.map((table) => {
        if (table.id === konvaEditTableIdArr[0]) {
          const newWidth = Math.max(170, Math.round((node.width() * scaleX) / blockSize) * blockSize);
          const newHeight = Math.max(130, Math.round((node.height() * scaleY) / blockSize) * blockSize);
          return {
            ...table,
            init: {
              ...table.init,
              rec: {
                width: newWidth,
                height: newHeight,
              },
              tableText: {
                width: newWidth - 40,
              },
              bottom: {
                ...table.init.bottom,
                y: newHeight - 40,
                line: { points: [0, 0, newWidth - 40, 0] },
                priceText: {
                  width: newWidth - 40,
                },
              },
            },
          };
        }
        return table;
      });
    });
  }

  return { changeTablePosition, onDragTransform };
}
