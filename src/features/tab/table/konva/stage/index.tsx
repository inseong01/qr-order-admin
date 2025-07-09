import { useEffect, useMemo, useRef, useState } from 'react';
import { Group, Layer, Rect, Stage, Text } from 'react-konva';
import Konva from 'konva';

import { Table } from '@/lib/supabase/function/table';

import TableLayer from '../layer';
import { SetClientTableList, StageSize } from '..';

export default function TableStage({
  stageSize,
  clientTableList,
  setClientTableList,
}: {
  stageSize: StageSize;
  clientTableList: Table[];
  setClientTableList: SetClientTableList;
}) {
  const konvaEditIsAble = false;
  // const konvaEditIsAble = useBoundStore((state) => state.konva.isAble);

  const stageRef = useRef<Konva.Stage>(null);
  const tableRangeRef = useRef<Konva.Layer>(null);

  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

  const stageScale = useMemo(() => {
    const isMobileSize = window.innerWidth <= 720 || window.innerHeight <= 720;
    return isMobileSize ? 0.49 : 1;
  }, [stageSize]);

  // 편집 범위 배경 애니메이션
  // useEffect(() => {
  //   if (!tableRangeRef.current) return;
  //   if (konvaEditIsAble) {
  //     tableRangeRef.current.to({
  //       opacity: 1,
  //       duration: 0.3,
  //     });
  //     return;
  //   }

  //   tableRangeRef.current.to({
  //     opacity: 0,
  //     duration: 0.3,
  //   });
  // }, [tableRangeRef, konvaEditIsAble]);

  // 초기 위치 화면 이동
  // function backToInitPos() {
  //   if (konvaEditIsAble) return;
  //   if (currentPos.x === 0 && currentPos.y === 0) return;
  //   setCurrentPos({ x: 0, y: 0 });
  // }

  // 드래그 위치 화면 이동
  // function getLastPos() {
  //   const ref = stageRef.current;
  //   if (ref) {
  //     const lastPos = ref.position();
  //     setCurrentPos({ x: lastPos.x, y: lastPos.y });
  //   }
  // }

  return (
    <Stage
      ref={stageRef}
      x={konvaEditIsAble ? 0 : currentPos.x}
      y={konvaEditIsAble ? 0 : currentPos.y}
      width={stageSize.stageWidth}
      height={stageSize.stageHeight}
      // onDblClick={backToInitPos}
      // onDblTap={backToInitPos}
      // onDragEnd={getLastPos}
      // draggable={!konvaEditIsAble}
      draggable={true}
      scaleX={stageScale}
      scaleY={stageScale}
    >
      {/* 테이블 편집 범위 */}
      <Layer ref={tableRangeRef} opacity={0}>
        <Group>
          {/* 범위 */}
          <Rect width={stageSize.stageWidth} height={stageSize.stageHeight} cornerRadius={15} fill='#b4b4b4' />

          {/* 글자 */}
          <Text
            text='배경 내에서 좌석을 수정할 수 있습니다'
            width={stageSize.stageWidth}
            height={stageSize.stageHeight}
            offsetX={-stageSize.stageWidth / 2 + 75}
            offsetY={-stageSize.stageHeight / 2 + 50}
          />
        </Group>
      </Layer>

      {/* 테이블 모형 */}
      <Layer>
        {clientTableList.map((table) => {
          return (
            <TableLayer key={table.id} table={table} stageRef={stageRef} setClientTableList={setClientTableList} />
          );
        })}
      </Layer>
    </Stage>
  );
}
