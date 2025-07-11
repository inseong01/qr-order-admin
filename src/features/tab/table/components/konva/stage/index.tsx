import { useAtom } from 'jotai';
import { useMemo, useRef } from 'react';
import { Layer, Rect, Stage, Text } from 'react-konva';
import Konva from 'konva';

import { tableAtom } from '../../../store/table-atom';
import TableLayer from '../layer';
import { StageSize } from '..';

export default function TableStage({ stageSize }: { stageSize: StageSize }) {
  const stageRef = useRef<Konva.Stage>(null);
  const [{ editMode, tables, tableIds }, setTableState] = useAtom(tableAtom);
  // const [{ isEditMode, tables: clientTableList }, setTableState] = useAtom(tableAtom);

  const stageScale = useMemo(() => {
    const isMobile = window.innerWidth <= 720 || window.innerHeight <= 720;
    return isMobile ? 0.49 : 1;
  }, [stageSize]);

  // 기능: 편집 모드에 따른 배경 애니메이션 (주석 처리된 원본 로직)
  // useEffect(() => { ... });
  console.log('tableIds ', tableIds);
  return (
    <Stage
      ref={stageRef}
      width={stageSize.stageWidth}
      height={stageSize.stageHeight}
      scaleX={stageScale}
      scaleY={stageScale}
      draggable={!editMode}
      // TODO: 드래그 및 더블클릭 이벤트 핸들러 구현 필요
      // onDragEnd={...}
      // onDblClick={...}
    >
      {/* 편집 모드일 때 나타나는 배경 */}
      <Layer opacity={editMode ? 1 : 0}>
        <Rect width={stageSize.stageWidth} height={stageSize.stageHeight} cornerRadius={15} fill='#b4b4b4' />
        <Text
          text='배경 내에서 좌석을 수정할 수 있습니다'
          width={stageSize.stageWidth}
          height={stageSize.stageHeight}
          align='center'
          verticalAlign='middle'
          fontSize={20}
          fill='white'
        />
      </Layer>

      {/* 테이블 목록 */}
      <Layer>
        {tables.map((table) => (
          <TableLayer key={table.id} table={table} />
        ))}
      </Layer>
    </Stage>
  );
}
