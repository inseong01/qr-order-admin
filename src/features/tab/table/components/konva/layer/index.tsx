import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { Group, Line, Rect, Text, Transformer } from 'react-konva';
import Konva from 'konva';

import { selectIdState } from '@/store/atom/id-atom';
import { Table } from '@/lib/supabase/tables/table';
import { OrderItem } from '@/lib/supabase/tables/order-item';
import { setTabModalAtomState } from '@/features/modal/tab/store/atom';

import {
  editModeAtom,
  isEditingAtom,
  resetTablEditAtom,
  selectedTableIdsAtom,
  selectTableAtom,
  updateDraftTableAtom,
} from '../../../store/table-edit-state';
import { tableStageAtom } from '../../../store/table-state';
import useOnMouseChangeCursor from '../../../hooks/use-change-cursor';

export default function TableLayer({ table, orders }: { table: Table; orders: OrderItem[] }) {
  const stage = useAtomValue(tableStageAtom);
  const editMode = useAtomValue(editModeAtom);
  const isEditing = useAtomValue(isEditingAtom);
  const tableIds = useAtomValue(selectedTableIdsAtom);
  const selectId = useSetAtom(selectIdState);
  const setTableModal = useSetAtom(setTabModalAtomState);
  const updateTable = useSetAtom(updateDraftTableAtom);
  const selectTable = useSetAtom(selectTableAtom);
  const resetTableEdit = useSetAtom(resetTablEditAtom);

  // 원래 좌석 정보 임시 보관
  const [preTransformTable, setPreTransformTable] = useState<Table | null>(null);
  // Konva.Group 커서 변환
  const { changeDefaultCursor, changePointerCursor } = useOnMouseChangeCursor(stage, table.id);

  const shapeRef = useRef<Konva.Rect>(null);
  const groupRef = useRef<Konva.Group>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const { meta, number, id } = table;
  const isSelectedTable = tableIds.includes(id);
  const totalPrice = orders.reduce((prev, curr) => prev + curr.menu.price * curr.quantity, 0).toLocaleString();

  // Transformer와 Shape 연결
  useEffect(() => {
    if (editMode === 'delete') return;
    if (!trRef.current || !shapeRef.current) return;
    if (isSelectedTable) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [editMode, tableIds]);

  // 'Escape' 키를 눌렀을 때 좌석 되돌리기
  useEffect(() => {
    if (isEditing) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (preTransformTable) {
        updateTable(preTransformTable); // 저장해둔 원래 정보로 복원
        setPreTransformTable(null); // 임시 상태 비우기
        return;
      }
      resetTableEdit(); // 좌석 상태 초기화
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editMode, preTransformTable, updateTable]);

  // 좌석 선택
  function handleSelectTable() {
    if (editMode === 'create') {
      return;
    }

    if (editMode === 'delete') {
      selectTable(table.id);
      return;
    }

    if (editMode === 'update') {
      // 다시 클릭하면 선택 해제
      if (isSelectedTable) return selectTable(table.id);

      // 업데이트에서는 테이블 하나만 선택 가능
      if (tableIds.length > 0) return;

      selectTable(table.id);
      return;
    }

    selectId(id);
    setTableModal('table-info');
  }

  // 변형(드래그, 리사이즈) 시작 시 원래 정보 저장
  const handleTransformStart = () => {
    if (preTransformTable) return;
    setPreTransformTable(table);
  };

  // 드래그 종료 시 위치 업데이트
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const node = e.target;
    const newTable = {
      ...table,
      meta: {
        ...table.meta,
        x: Math.floor(node.x()),
        y: Math.floor(node.y()),
      },
    };
    updateTable(newTable);
  };

  // 리사이즈 종료 시 크기 및 선(Line) 정보 업데이트
  const handleTransformEnd = () => {
    const node = shapeRef.current;
    const group = groupRef.current;
    if (!node || !group) return;

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const newWidth = Math.floor(Math.max(170, node.width() * scaleX));
    const newHeight = Math.floor(Math.max(130, node.height() * scaleY));

    const newAbsX = Math.floor(group.x() + node.x());
    const newAbsY = Math.floor(group.y() + node.y());

    node.scaleX(1);
    node.scaleY(1);
    node.x(0);
    node.y(0);

    const newTable = {
      ...table,
      meta: {
        ...table.meta,
        x: newAbsX,
        y: newAbsY,
        rec: {
          width: newWidth,
          height: newHeight,
        },
        bottom: {
          ...table.meta.bottom,
          y: newHeight - 48,
          line: {
            ...table.meta.bottom.line,
            points: [0, 0, newWidth - 40, 0],
          },
        },
      },
    };
    updateTable(newTable);
  };

  // 좌석 모형 변환 제한 설정
  function limitBoundBox(oldBox: any, newBox: any) {
    if (!stage) return oldBox;

    const mousePos = stage.getPointerPosition() as Konva.Vector2d;
    const newWidth = parseInt(newBox.width, 10);
    const newHeight = parseInt(newBox.height, 10);

    const stageWidth = stage.width();
    const stageHeight = stage.height();

    const widthTooSmall = newWidth < 170;
    const widthTooLarge = newWidth > stageWidth - 10;
    const heightTooSmall = newHeight < 130;
    const heightTooLarge = newHeight > stageHeight - 10;

    const shouldFixWidth = mousePos.x < meta.x || widthTooSmall || widthTooLarge;
    const shouldFixHeight = mousePos.y < meta.y || heightTooSmall || heightTooLarge;

    return {
      ...oldBox,
      width: shouldFixWidth ? 170 : newBox.width,
      height: shouldFixHeight ? 130 : newBox.height,
      x: shouldFixWidth || shouldFixHeight ? meta.x : newBox.x,
      y: shouldFixWidth || shouldFixHeight ? meta.y : newBox.y,
    };
  }

  // 좌석 이동 범위 제한
  function restrictDragBounds(e: Konva.KonvaEventObject<DragEvent>) {
    if (!stage) return;

    // 이동 객체 정보
    const table = e.target;
    const newX = table.x();
    const newY = table.y();

    // 범위 정보
    const stageAtrrs = stage.attrs;
    const stageWidth: number = stageAtrrs.width;
    const stageHeight: number = stageAtrrs.height;

    // 범위 제한 정도
    const minX = 10;
    const maxX = stageWidth - meta.rec.width - 10;
    const minY = 10;
    const maxY = stageHeight - meta.rec.height - 10;

    // 제한 조건
    if (newX < minX) table.x(minX);
    if (newX > maxX) table.x(maxX);
    if (newY < minY) table.y(minY);
    if (newY > maxY) table.y(maxY);
  }

  return (
    <Group
      ref={groupRef}
      key={id}
      id={id}
      x={meta.x}
      y={meta.y}
      onClick={handleSelectTable}
      onTap={handleSelectTable}
      draggable={(editMode === 'create' || editMode === 'update') && isSelectedTable}
      onDragStart={handleTransformStart}
      onDragMove={restrictDragBounds}
      onDragEnd={handleDragEnd}
      onMouseEnter={changePointerCursor}
      onMouseLeave={changeDefaultCursor}
    >
      <Rect
        ref={shapeRef}
        width={meta.rec.width}
        height={meta.rec.height}
        fill={'#fff'}
        stroke={isSelectedTable && editMode === 'delete' ? 'red' : 'white'}
        cornerRadius={12}
        onTransformStart={handleTransformStart}
        onTransformEnd={handleTransformEnd}
      />
      {/* 도형 변환기 */}
      {isSelectedTable && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          keepRatio={false}
          rotateEnabled={false}
          enabledAnchors={['middle-right', 'bottom-center']}
          boundBoxFunc={limitBoundBox}
          padding={8}
          anchorCornerRadius={12}
        />
      )}

      {/* 좌석 상단 */}
      <Group x={20} y={20}>
        <Text text={`테이블 ${number}`} width={meta.tableText.width} fill={'#222'} fontSize={18} align='left' />
      </Group>

      {/* 좌석 하단 */}
      {!editMode && (
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
      )}
    </Group>
  );
}
