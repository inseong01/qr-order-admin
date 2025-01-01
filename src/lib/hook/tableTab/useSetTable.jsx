import { useSelector } from 'react-redux';

export default function useSetTable(stage, init, shapeRef, setClientTableList) {
  // useSelector
  const konvaEditTableIdArr = useSelector((state) => state.konvaState.target.id);
  // variant
  const blockSize = 10;

  function changeTablePosition(e) {
    stage.current.container().style.cursor = 'move';
    const stageAttrs = stage.current.attrs;
    const lastPs = e.target.position();
    console.log(2);
    setClientTableList((prev) =>
      prev.map((table) => {
        if (table.id === konvaEditTableIdArr[0]) {
          let newPosX = Math.round(lastPs.x / blockSize) * blockSize;
          let newPosY = Math.round(lastPs.y / blockSize) * blockSize;
          newPosX = Math.max(10, Math.min(newPosX, stageAttrs.width - init.rec.width - 10)); // stageWidth 임의 설정
          newPosY = Math.max(10, Math.min(newPosY, stageAttrs.height - init.rec.height - 10)); // stageHeight 임의 설정
          console.log(newPosX, newPosY);
          return {
            ...table,
            init: {
              ...table.init,
              x: newPosX,
              y: newPosY,
            },
          };
        }
        return table;
      })
    );
  }

  function onDragTransform() {
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
