import useOpenTableInfo from '../../../lib/hook/tableTab/useOpenTableInfo';
import useEditTable from '../../../lib/hook/tableTab/useEditTable';
import useOnMouseChangeCursor from '../../../lib/hook/tableTab/useOnMouseChangeCursor';
import useSetTable from '../../../lib/hook/tableTab/useSetTable';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import TableName from './TableName';
import TableBillPrice from './TableBillPrice';

import { useEffect, useRef, useState } from 'react';
import { Group, Rect, Transformer } from 'react-konva';

export default function TableLayer({ stage, table, setClientTableList }) {
  // store
  const konvaEditTableIdArr = useBoundStore((state) => state.konva.target.id);
  const konvaEditType = useBoundStore((state) => state.konva.type);
  const konvaEditIsEditing = useBoundStore((state) => state.konva.isEditing);
  const changeKonvaIsEditingState = useBoundStore((state) => state.changeKonvaIsEditingState);
  const setKonvaEditEnd = useBoundStore((state) => state.setKonvaEditEnd);
  // variant
  const { init, order, tableNum, id } = table;
  const isTransformerAble = id === konvaEditTableIdArr[0] && konvaEditType !== 'delete';
  const isSelectedToDelete = konvaEditType === 'delete' && konvaEditTableIdArr.includes(id);
  // useRef
  const shapeRef = useRef(null);
  const trRef = useRef(null);
  // useState
  const [isDragging, setDrag] = useState(false);
  // hook
  const { onClickOpenTableInfo } = useOpenTableInfo();
  const { onClickEditTable } = useEditTable();
  const { onMouseLeaveChangePointer, onMouseEnterChangePointer } = useOnMouseChangeCursor(stage, table);
  const { changeTablePosition, onDragTransform } = useSetTable(stage, shapeRef, setClientTableList);

  // 편집 유형 '생성/수정', 선택 좌석 transformer 적용
  useEffect(() => {
    if (isTransformerAble) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [konvaEditTableIdArr]);

  // 좌석 모형 변환 제한 설정
  function limitBoundBox(oldBox, newBox) {
    // 커서 위치
    const mousePos = stage.current.getPointerPosition();
    // 새로운 박스 크기
    const newBoxWidthAmount = parseInt(newBox.width, 10);
    const newBoxHeightAmount = parseInt(newBox.height, 10);
    // 변형 조건
    const isMoousePosXLess = mousePos.x < init.x;
    const isWidthLess = 170 > newBoxWidthAmount;
    const isMousePosYLess = mousePos.y < init.y;
    const isHeightLess = 130 > newBoxHeightAmount;
    // 최종 변형 값
    if (isMoousePosXLess || isWidthLess) {
      return {
        ...oldBox,
        width: 170,
        x: init.x,
        y: init.y,
      };
    } else if (isMousePosYLess || isHeightLess) {
      return {
        ...oldBox,
        height: 130,
        x: init.x,
        y: init.y,
      };
    }

    return {
      ...oldBox,
      width: newBoxWidthAmount,
      height: newBoxHeightAmount,
      x: init.x,
      y: init.y,
    };
  }
  // 좌석 선택, 조건 별 처리
  function onClickSelectTable() {
    // 테이블 정보 창 열기
    onClickOpenTableInfo({ table });
    // 테이블 편집 하기
    onClickEditTable({ stage, id });
  }
  // 좌석 변형 처음
  function onDragTransformStart() {
    setDrag(true);
  }
  // 드래그 마지막 순간 통합 함수
  function onDragEnd(event) {
    return (e) => {
      // 이벤트 별 적용
      switch (event) {
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
      // 공통 부분
      setKonvaEditEnd({ isEditEnd: true });
      // Konva 편집 중
      if (konvaEditIsEditing) return;
      changeKonvaIsEditingState({ isEditing: true });
    };
  }
  // 좌석 이동 범위 제한
  function onDragMove(e) {
    // 이동 객체 정보
    const table = e.target;
    const newX = table.x();
    const newY = table.y();
    // 범위 정보
    const stageAtrrs = stage.current.attrs;
    const stageWidth = stageAtrrs.width;
    const stageHeight = stageAtrrs.height;
    // 범위 제한 정도
    const minX = 10;
    const maxX = stageWidth - init.rec.width - 10;
    const minY = 10;
    const maxY = stageHeight - init.rec.height - 10;
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
        x={init.x}
        y={init.y}
        draggable={isTransformerAble}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd('onDragMoveEnd')}
        onClick={onClickSelectTable}
        onMouseEnter={onMouseEnterChangePointer}
        onMouseLeave={onMouseLeaveChangePointer}
      >
        <Group>
          <Rect
            ref={shapeRef}
            width={init.rec.width}
            height={init.rec.height}
            fill={'#fff'}
            stroke={isSelectedToDelete ? 'red' : 'white'}
            cornerRadius={10}
            onTransformStart={onDragTransformStart}
            onTransformEnd={onDragEnd('onDragTransformEnd')}
          />
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
          <TableName tableNum={tableNum} width={init.tableText.width} />
          <TableBillPrice order={order} bottom={init.bottom} isDragging={isDragging} />
        </Group>
      </Group>
    </>
  );
}
