import { useEffect, useRef } from 'react';
import { Group, Layer, Line, Rect, Text, Transformer } from 'react-konva';

export default function TableLayer({ table, setClientTableList, konvaEditTableId }) {
  const { init, orderList, tableName, id } = table;
  const totalPrice = orderList.reduce((prev, list) => prev + Number(list.price), 0).toLocaleString();
  // useRef
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (konvaEditTableId !== id) return;
    trRef.current.nodes([shapeRef.current]);
    trRef.current.getLayer().batchDraw();
  }, [konvaEditTableId]);

  function changeTablePosition(e) {
    const lastPs = e.target.position();
    setClientTableList((prev) =>
      prev.map((table) => {
        if (table.id === konvaEditTableId) {
          return {
            ...table,
            init: {
              ...table.init,
              x: lastPs.x,
              y: lastPs.y,
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
        if (table.id === konvaEditTableId) {
          const newWidth = Math.max(170, parseInt(node.width() * scaleX));
          const newHeight = Math.max(130, parseInt(node.height() * scaleY));

          return {
            ...table,
            init: {
              ...table.init,
              rec: {
                width: newWidth,
                height: newHeight,
              },
            },
          };
        }
        return table;
      });
    });
  }

  function limitBoundBox(oldBox, newBox) {
    // 도형 사이즈 반전 이동 조절 가능
    if (newBox.width < 169) {
      return oldBox;
    }
    if (newBox.height < 129) {
      return oldBox;
    }
    return newBox;
  }

  return (
    <Layer
      key={id}
      x={init.x}
      y={init.y}
      draggable={table.id === konvaEditTableId}
      onDragEnd={changeTablePosition}
    >
      <Group>
        <Rect
          ref={shapeRef}
          width={init.rec.width}
          height={init.rec.height}
          fill={'#fff'}
          cornerRadius={10}
          onTransformEnd={onDragTransform}
        />
        {table.id === konvaEditTableId && (
          <Transformer ref={trRef} flipEnabled={false} keepRatio={false} boundBoxFunc={limitBoundBox} />
        )}
        <Group x={20} y={20}>
          <Text text={tableName} width={init.tableText.width} fill={'#222'} fontSize={18} align="left" />
        </Group>
        <Group x={20} y={90}>
          <Line points={init.line.points} strokeWidth={1} stroke={'#8D8D8D'} />
          <Group x={0} y={10}>
            <Text text="합계" width={init.priceText.width} fill={'#8D8D8D'} fontSize={15} align="left" />
            <Text
              text={`${totalPrice}원`}
              width={init.priceText.width}
              fill={'#8D8D8D'}
              fontSize={15}
              align="right"
            />
          </Group>
        </Group>
      </Group>
    </Layer>
  );
}
