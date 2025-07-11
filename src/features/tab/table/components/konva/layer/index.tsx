import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { Group, Line, Rect, Text, Transformer } from 'react-konva';
import Konva from 'konva';

import { selectIdState } from '@/store/atom/id-atom';
import { Table } from '@/lib/supabase/function/table';
import { setTabModalAtomState } from '@/features/modal/tab/store/atom';

import { selectTableAtom, tableAtom } from '../../../store/table-atom';

export default function TableLayer({ table }: { table: Table }) {
  const selectId = useSetAtom(selectIdState);
  const setTableModal = useSetAtom(setTabModalAtomState);
  const selectTable = useSetAtom(selectTableAtom);
  const { editMode, tableIds } = useAtomValue(tableAtom);

  const shapeRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const { meta, number, id } = table;
  const isSelectedTable = tableIds.includes(id);
  const totalPrice = 0; // TODO: 실제 주문 총액 계산 로직 필요

  // Transformer와 Shape 연결
  useEffect(() => {
    if (editMode === 'update' && isSelectedTable && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [editMode, isSelectedTable]);

  function handleSelectTable() {
    if (editMode === 'create') {
      return;
    }

    if (editMode === 'delete') {
      selectTable(table.id);
      return;
    }

    if (editMode === 'update') {
      if (isSelectedTable) return selectTable(table.id);
      if (tableIds.length > 0) return;
      selectTable(table.id);
      return;
    }

    selectId(id);
    setTableModal('table-info');
  }

  // 좌석 모형 변환 제한 설정
  function limitBoundBox(oldBox: any, newBox: any) {
    // 커서 위치
    const mousePos = stageRef.current.getPointerPosition() as Konva.Vector2d;
    /* 커서 위치 받아오기 */

    // 새로운 박스 크기
    const newBoxWidthAmount = parseInt(newBox.width, 10);
    const newBoxHeightAmount = parseInt(newBox.height, 10);

    // 변형 조건
    const isMoousePosXLess = mousePos.x < table.meta.x;
    const isWidthLess = 170 > newBoxWidthAmount;
    const isMousePosYLess = mousePos.y < table.meta.y;
    const isHeightLess = 130 > newBoxHeightAmount;

    // 최종 변형 값
    if (isMoousePosXLess || isWidthLess) {
      return {
        ...oldBox,
        width: 170,
        x: tableInit.x,
        y: tableInit.y,
      };
    } else if (isMousePosYLess || isHeightLess) {
      return {
        ...oldBox,
        height: 130,
        x: tableInit.x,
        y: tableInit.y,
      };
    }

    return {
      ...oldBox,
      width: newBoxWidthAmount,
      height: newBoxHeightAmount,
      x: tableInit.x,
      y: tableInit.y,
    };
  }

  return (
    <Group
      key={id}
      id={String(id)}
      x={meta.x}
      y={meta.y}
      onClick={handleSelectTable}
      // onTap={handleSelectTable}
      draggable={(editMode === 'create' || editMode === 'update') && isSelectedTable}
    >
      <Rect
        ref={shapeRef}
        width={meta.rec.width}
        height={meta.rec.height}
        fill={'#fff'}
        stroke={isSelectedTable && editMode === 'delete' ? 'red' : 'white'}
        cornerRadius={10}
      />
      {/* 도형 변환기 */}
      {editMode === 'update' && isSelectedTable && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          keepRatio={false}
          rotateEnabled={false}
          rotateLineVisible={false}
          enabledAnchors={['middle-right', 'bottom-center']}
          boundBoxFunc={limitBoundBox}
        />
      )}

      {/* 좌석 */}
      <Group x={20} y={20}>
        <Text text={`테이블 ${number}`} width={meta.tableText.width} fill={'#222'} fontSize={18} align='left' />
      </Group>
      <Group x={20} y={meta.bottom.y}>
        <Line points={meta.bottom.line.points} strokeWidth={1} stroke={'#8D8D8D'} />
        <Group x={0} y={10}>
          <Text text='합계' width={meta.bottom.priceText.width} fill={'#8D8D8D'} fontSize={15} align='left' />
          <Text
            text={`${totalPrice}원`}
            width={meta.bottom.priceText.width}
            fill={'#8D8D8D'}
            fontSize={15}
            align='right'
          />
        </Group>
      </Group>
    </Group>
  );
}
