import { useBoundStore } from '../../../lib/store/useBoundStore';
import { TableList } from '../../../types/common';
import TableEditRange from './TableEditRange';
import TableLayer from './TableLayer';
import { SetClientTableList, StageSize } from './KonvaSection';

import { Layer, Stage } from 'react-konva';
import { useMemo, useRef, useState } from 'react';
import Konva from 'konva';

export default function TableDraw({
  stageSize,
  clientTableList,
  setClientTableList,
}: {
  stageSize: StageSize;
  clientTableList: TableList[];
  setClientTableList: SetClientTableList;
}) {
  // store
  const konvaEditIsAble = useBoundStore((state) => state.konva.isAble);
  // useRef
  const stageRef = useRef<Konva.Stage>(null);
  // useState
  const [currentPos, setCurrentPos] = useState({
    x: 0,
    y: 0,
  });
  const stageScale = useMemo(() => {
    const isMobileSize = window.innerWidth <= 720 || window.innerHeight <= 720;
    return isMobileSize ? 0.49 : 1;
  }, [stageSize]);

  // 초기 위치 화면 이동
  function backToInitPos() {
    if (konvaEditIsAble) return;
    if (currentPos.x === 0 && currentPos.y === 0) return;
    setCurrentPos({ x: 0, y: 0 });
  }

  // 드래그 위치 화면 이동
  function getLastPos() {
    const ref = stageRef.current;
    if (ref) {
      const lastPos = ref.position();
      setCurrentPos({ x: lastPos.x, y: lastPos.y });
    }
  }

  return (
    <Stage
      ref={stageRef}
      x={konvaEditIsAble ? 0 : currentPos.x}
      y={konvaEditIsAble ? 0 : currentPos.y}
      width={stageSize.stageWidth}
      height={stageSize.stageHeight}
      onDblClick={backToInitPos}
      onDblTap={backToInitPos}
      onDragEnd={getLastPos}
      draggable={!konvaEditIsAble}
      scaleX={stageScale}
      scaleY={stageScale}
    >
      <TableEditRange stageSize={stageSize} />
      <Layer>
        {clientTableList.map((table) => {
          return (
            <TableLayer
              key={table.tableNum}
              table={table}
              stageRef={stageRef}
              setClientTableList={setClientTableList}
            />
          );
        })}
      </Layer>
    </Stage>
  );
}
