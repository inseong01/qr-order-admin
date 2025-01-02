import useOpenTableInfo from '../../../lib/hook/tableTab/useOpenTableInfo';
import useEditTable from '../../../lib/hook/tableTab/useEditTable';
import useOnMouseChangeCursor from '../../../lib/hook/tableTab/useOnMouseChangeCursor';
import useSetTable from '../../../lib/hook/tableTab/useSetTable';
import { getClientTableList } from '../../../lib/features/itemState/itemSlice';
import TableName from './TableName';
import TableBillPrice from './TableBillPrice';

import { useEffect, useRef, useState } from 'react';
import { Group, Rect, Transformer } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';

export default function TableLayer({ stage, table, clientTableList, setClientTableList }) {
  // useSelector
  const konvaEditTableIdArr = useSelector((state) => state.konvaState.target.id);
  const konvaEditType = useSelector((state) => state.konvaState.type);
  // variant
  const { init, order, tableNum, id } = table;
  const isTransformerAble = id === konvaEditTableIdArr[0] && konvaEditType !== 'delete';
  const isSelectedToDelete = konvaEditType === 'delete' && konvaEditTableIdArr.includes(id);
  // useRef
  const shapeRef = useRef(null);
  const trRef = useRef(null);
  // useState
  const [isEditEnd, setEditEnd] = useState(false);
  const [isDragging, setDrag] = useState(false);
  // hook
  const { onClickOpenTableInfo } = useOpenTableInfo();
  const { onClickEditTable } = useEditTable();
  const { onMouseLeaveChangePointer, onMouseEnterChangePointer } = useOnMouseChangeCursor(stage, table);
  const { changeTablePosition, onDragTransform } = useSetTable(stage, init, shapeRef, setClientTableList);
  // useDispatch
  const dispatch = useDispatch();

  // 편집 유형 '생성/수정', 선택 좌석 transformer 적용
  useEffect(() => {
    if (isTransformerAble) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [konvaEditTableIdArr]);

  // 테이블 위치 수정, dispatch 요청
  useEffect(() => {
    /*
      isEditEnd true일 때만 전달 허용
      useState 비동기 동작으로 dispatch 동시에 사용할 수 없음
      갱신 이전 값이 dispatch로 전달됨

      트리거를 사용하여 조건에 맞춰 dispatch 실행
      isEditEnd를 의존성으로 추가하면 갱신 이전 값 전달됨 
    */
    if (isEditEnd) {
      // 수정/추가된 테이블 배열 전달
      dispatch(getClientTableList({ clientTableList }));
    }
    setEditEnd(false);
  }, [clientTableList]);

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
  // 좌석 변형 시작 순간
  function onDragTransformStart() {
    setDrag(true);
  }
  // 좌석 변형 마지막 순간
  function onDragTransformEnd() {
    onDragTransform();
    dispatch(getClientTableList({ clientTableList }));
    setEditEnd(true);
    setDrag(false);
  }
  // 좌석 위치 이동 마지막 순간
  function onDragMoveEnd(e) {
    changeTablePosition(e);
    setEditEnd(true);
  }

  return (
    <>
      <Group
        key={id}
        id={id}
        x={init.x}
        y={init.y}
        draggable={isTransformerAble}
        onDragEnd={onDragMoveEnd}
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
            onTransformEnd={onDragTransformEnd}
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
