import { RefObject, useEffect, useRef, useState } from 'react';
import { Group, Line, Rect, Text, Transformer } from 'react-konva';
import Konva from 'konva';

import { useBoundStore } from '../../../../lib/store/use-bound-store';

import { Order, TableInit, TableList } from '../../../../types/common';

import useOpenTableInfo from './hook/use-open-table';
import useEditTable from './hook/use-edit-table';
import useOnMouseChangeCursor from './hook/use-change-cursor';
import useSetTable from './hook/use-set-table';

import { SetClientTableList } from './konva-index';

type EventType = 'onDragMoveEnd' | 'onDragTransformEnd';
export type OnDrageEndEvent = Konva.KonvaEventObject<DragEvent> | Konva.KonvaEventObject<Event>;

export default function TableLayer({
  stageRef,
  table,
  setClientTableList,
}: {
  stageRef: RefObject<Konva.Stage>;
  table: TableList;
  setClientTableList: SetClientTableList;
}) {
  const konvaEditTableIdArr = useBoundStore((state) => state.konva.target.id);
  const konvaEditType = useBoundStore((state) => state.konva.type);
  const konvaEditIsEditing = useBoundStore((state) => state.konva.isEditing);
  const changeKonvaIsEditingState = useBoundStore((state) => state.changeKonvaIsEditingState);

  const shapeRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const billRef = useRef<Konva.Group>(null);

  const [isDragging, setDrag] = useState(false);

  const { onClickOpenTableInfo } = useOpenTableInfo();
  const { onClickEditTable } = useEditTable();
  const { onMouseLeaveChangePointer, onMouseEnterChangePointer } = useOnMouseChangeCursor(stageRef, table);
  const { changeTablePosition, onDragTransform } = useSetTable(stageRef, shapeRef, setClientTableList);

  const { init, order, tableNum, id } = table;
  const currentTableOrder = order as Order[];
  const tableInit = init as TableInit;
  const isTransformerAble = id === konvaEditTableIdArr[0] && konvaEditType !== 'delete';
  const isSelectedToDelete = konvaEditType === 'delete' && konvaEditTableIdArr.includes(id);
  const totalPrice =
    currentTableOrder
      ?.reduce((prev, list) => prev + list.orderList?.reduce((prev, curr) => prev + curr.price * curr.amount, 0), 0)
      .toLocaleString() ?? 0;

  // 편집 유형 '생성/수정', 선택 좌석 transformer 적용
  useEffect(() => {
    const ref = trRef.current;
    const shape = shapeRef.current;
    if (ref && shape) {
      if (isTransformerAble) {
        ref.nodes([shape]);
        const selectedLayer = ref.getLayer() as Konva.Layer;
        selectedLayer.batchDraw();
      }
    }
  }, [konvaEditTableIdArr]);

  // 좌석 변형 시 bottom 투명도 조절
  useEffect(() => {
    if (!billRef.current) return;
    if (isDragging) {
      billRef.current.to({
        opacity: 0,
        duration: 0.1,
      });
      return;
    }
    billRef.current.to({
      opacity: 1,
      duration: 0.3,
    });
  }, [isDragging]);

  // 좌석 모형 변환 제한 설정
  function limitBoundBox(oldBox: any, newBox: any) {
    if (!stageRef.current) return;
    // 커서 위치
    const mousePos = stageRef.current.getPointerPosition() as Konva.Vector2d;

    // 새로운 박스 크기
    const newBoxWidthAmount = parseInt(newBox.width, 10);
    const newBoxHeightAmount = parseInt(newBox.height, 10);

    // 변형 조건
    const isMoousePosXLess = mousePos.x < tableInit.x;
    const isWidthLess = 170 > newBoxWidthAmount;
    const isMousePosYLess = mousePos.y < tableInit.y;
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
  // 좌석 선택, 조건 별 처리
  function onClickSelectTable() {
    // 테이블 정보 창 열기
    onClickOpenTableInfo({ table });

    // 테이블 편집 하기
    onClickEditTable({ stageRef, id });
  }

  // 좌석 변형 처음
  function onDragTransformStart() {
    setDrag(true);
  }

  // 드래그 마지막 순간 통합 함수
  function onDragEnd(eventType: EventType) {
    return (e: OnDrageEndEvent) => {
      // 이벤트 별 적용
      switch (eventType) {
        // 좌석 위치 이동 마지막
        case 'onDragMoveEnd': {
          changeTablePosition(e);
          break;
        }

        // 좌석 변형 마지막
        case 'onDragTransformEnd': {
          onDragTransform();
          setDrag(false);
          break;
        }
      }

      // Konva 편집 중
      if (konvaEditIsEditing) return;
      changeKonvaIsEditingState({ isEditing: true });
    };
  }

  // 좌석 이동 범위 제한
  function onDragMove(e: Konva.KonvaEventObject<DragEvent>) {
    if (!stageRef.current) return;

    // 이동 객체 정보
    const table = e.target;
    const newX = table.x();
    const newY = table.y();

    // 범위 정보
    const stageAtrrs = stageRef.current.attrs;
    const stageWidth: number = stageAtrrs.width;
    const stageHeight: number = stageAtrrs.height;

    // 범위 제한 정도
    const minX = 10;
    const maxX = stageWidth - tableInit.rec.width - 10;
    const minY = 10;
    const maxY = stageHeight - tableInit.rec.height - 10;

    // 제한 조건
    if (newX < minX) table.x(minX);
    if (newX > maxX) table.x(maxX);
    if (newY < minY) table.y(minY);
    if (newY > maxY) table.y(maxY);
  }

  return (
    <>
      <Group
        key={id}
        id={id}
        x={tableInit.x}
        y={tableInit.y}
        draggable={isTransformerAble}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd('onDragMoveEnd')}
        onClick={onClickSelectTable}
        onMouseEnter={onMouseEnterChangePointer}
        onMouseLeave={onMouseLeaveChangePointer}
      >
        <Group>
          {/* 좌석 배경 */}
          <Rect
            ref={shapeRef}
            width={tableInit.rec.width}
            height={tableInit.rec.height}
            fill={'#fff'}
            stroke={isSelectedToDelete ? 'red' : 'white'}
            cornerRadius={10}
            onTransformStart={onDragTransformStart}
            onTransformEnd={onDragEnd('onDragTransformEnd')}
          />

          {/* 편집 도구 모형 */}
          {isTransformerAble && (
            <Transformer
              ref={trRef}
              flipEnabled={false}
              keepRatio={false}
              boundBoxFunc={limitBoundBox}
              rotateEnabled={false}
              rotateLineVisible={false}
              enabledAnchors={['middle-right', 'bottom-center']}
            />
          )}

          {/* 좌석 이름 */}
          <Group x={20} y={20}>
            <Text
              text={`테이블 ${tableNum}`}
              width={tableInit.tableText.width}
              fill={'#222'}
              fontSize={18}
              align='left'
            />
          </Group>

          {/* 좌석 주문 총액 */}
          <Group ref={billRef} x={20} y={tableInit.bottom.y}>
            {/* 구분선 */}
            <Line points={tableInit.bottom.line.points} strokeWidth={1} stroke={'#8D8D8D'} />

            {/* 총액 */}
            <Group x={0} y={10}>
              <Text text='합계' width={tableInit.bottom.priceText.width} fill={'#8D8D8D'} fontSize={15} align='left' />
              <Text
                text={`${totalPrice}원`}
                width={tableInit.bottom.priceText.width}
                fill={'#8D8D8D'}
                fontSize={15}
                align='right'
              />
            </Group>
          </Group>
        </Group>
      </Group>
    </>
  );
}
