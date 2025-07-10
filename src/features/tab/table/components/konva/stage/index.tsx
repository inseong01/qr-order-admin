
import { useMemo, useRef } from 'react';
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
  const stageRef = useRef<Konva.Stage>(null);
  
  // TODO: Konva 편집 모드 상태 관리 필요
  const isEditingMode = false; 

  const stageScale = useMemo(() => {
    const isMobile = window.innerWidth <= 720 || window.innerHeight <= 720;
    return isMobile ? 0.49 : 1;
  }, [stageSize]);

  // 기능: 편집 모드에 따른 배경 애니메이션 (주석 처리된 원본 로직)
  // useEffect(() => { ... });

  return (
    <Stage
      ref={stageRef}
      width={stageSize.stageWidth}
      height={stageSize.stageHeight}
      scaleX={stageScale}
      scaleY={stageScale}
      draggable={!isEditingMode}
      // TODO: 드래그 및 더블클릭 이벤트 핸들러 구현 필요
      // onDragEnd={...}
      // onDblClick={...}
    >
      {/* 편집 모드일 때 나타나는 배경 */}
      <Layer opacity={isEditingMode ? 1 : 0}>
        <Rect width={stageSize.stageWidth} height={stageSize.stageHeight} cornerRadius={15} fill='#b4b4b4' />
        <Text
          text='배경 내에서 좌석을 수정할 수 있습니다'
          width={stageSize.stageWidth}
          height={stageSize.stageHeight}
          align="center"
          verticalAlign="middle"
          fontSize={20}
          fill="white"
        />
      </Layer>

      {/* 테이블 목록 */}
      <Layer>
        {clientTableList.map((table) => (
          <TableLayer
            key={table.id}
            table={table}
            stageRef={stageRef}
            setClientTableList={setClientTableList}
          />
        ))}
      </Layer>
    </Stage>
  );
}
