import { useEffect, useRef } from 'react';
import { Group, Line, Rect, Text, Transformer } from 'react-konva';

export default function TableLayer({ table, setClientTableList, konvaEditTableId }) {
  const { init, orderList, tableName, id } = table;
  const totalPrice = orderList.reduce((prev, list) => prev + Number(list.price), 0).toLocaleString();
  const blockSize = 10;
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

    if (lastPs.x < 0 && init.x === 0) {
      return setClientTableList((prev) => [...prev]);
    }

    setClientTableList((prev) =>
      prev.map((table) => {
        if (table.id === konvaEditTableId) {
          let newPosX = Math.round(lastPs.x / blockSize) * blockSize;
          let newPosY = Math.round(lastPs.y / blockSize) * blockSize;
          newPosX = Math.max(10, Math.min(newPosX, 1323 - init.rec.width - 10)); // stageWidth 임의 설정
          newPosY = Math.max(10, Math.min(newPosY, 664 - init.rec.height - 10)); // stageHeight 임의 설정
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
        if (table.id === konvaEditTableId) {
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

  function limitBoundBox(oldBox, newBox) {
    const newBoxPosX = Math.round(newBox.x);
    const newBoxWidth = Math.round(newBox.width);
    const oldBoxPosX = Math.round(oldBox.x);
    if (newBox.width < 169 || newBoxPosX !== oldBoxPosX || newBoxWidth + newBoxPosX > 1323 - 9) {
      // stageWidth 임의 설정
      return oldBox;
    }

    const newBoxPosY = Math.round(newBox.y);
    const newBoxHeight = Math.round(newBox.height);
    const oldBoxPosY = Math.round(oldBox.y);
    if (newBox.height < 129 || newBoxPosY !== oldBoxPosY || newBoxHeight + newBoxPosY > 664 - 9) {
      // stageHeight 임의 설정
      return oldBox;
    }
    return newBox;
  }

  return (
    <Group
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
          onTransform={onDragTransform}
        />
        {table.id === konvaEditTableId && (
          <Transformer
            ref={trRef}
            flipEnabled={false}
            keepRatio={false}
            boundBoxFunc={limitBoundBox}
            rotateEnabled={false}
            rotateLineVisible={false}
            enabledAnchors={['middle-right', 'bottom-center']}
            borderEnabled={false}
          />
        )}
        <Group x={20} y={20}>
          <Text text={tableName} width={init.tableText.width} fill={'#222'} fontSize={18} align="left" />
        </Group>
        <Group x={20} y={init.bottom.y}>
          <Line points={init.bottom.line.points} strokeWidth={1} stroke={'#8D8D8D'} />
          <Group x={0} y={10}>
            <Text
              text="합계"
              width={init.bottom.priceText.width}
              fill={'#8D8D8D'}
              fontSize={15}
              align="left"
            />
            <Text
              text={`${totalPrice}원`}
              width={init.bottom.priceText.width}
              fill={'#8D8D8D'}
              fontSize={15}
              align="right"
            />
          </Group>
        </Group>
      </Group>
    </Group>
  );
}
