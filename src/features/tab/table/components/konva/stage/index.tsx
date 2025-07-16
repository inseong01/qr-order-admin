import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useMemo, useRef } from 'react';
import { Layer, Rect, Stage, Text } from 'react-konva';
import Konva from 'konva';

import { windowStateAtom } from '@/store/atom/window-atom';

import { setTableStageAtom, tableAtom } from '../../../store/table-atom';
import TableLayer from '../layer';

export default function TableStage() {
  const stageRef = useRef<Konva.Stage>(null);
  const { editMode, tables } = useAtomValue(tableAtom);
  const { mainSection } = useAtomValue(windowStateAtom);
  const setTableStage = useSetAtom(setTableStageAtom);

  const stageScale = useMemo(() => {
    const isMobile = window.innerWidth <= 720 || window.innerHeight <= 720;
    return isMobile ? 0.49 : 1;
  }, [mainSection]);

  useEffect(() => {
    if (!stageRef.current) return;
    setTableStage(stageRef.current);
  }, [stageRef]);

  return (
    <Stage
      ref={stageRef}
      width={mainSection.width}
      height={mainSection.height}
      scaleX={stageScale}
      scaleY={stageScale}
      draggable={!editMode}
    >
      {/* 편집 모드일 때 나타나는 배경 */}
      <Layer opacity={editMode ? 1 : 0}>
        <Rect width={mainSection.width} height={mainSection.height} cornerRadius={12} fill='#b4b4b4' />
        <Text
          text='배경 내에서 좌석을 수정할 수 있습니다'
          width={mainSection.width}
          height={mainSection.height}
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
