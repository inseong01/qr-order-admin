import useOpenTableInfo from '../../../lib/hook/tableTab/useOpenTableInfo';
import useEditTable, { initialMsgObj } from '../../../lib/hook/tableTab/useEditTable';
import useOnMouseChangeCursor from '../../../lib/hook/tableTab/useOnMouseChangeCursor';
import fetchTableRequestList from '../../../lib/supabase/func/fetchTableRequestList';
import useSetTable from '../../../lib/hook/tableTab/useSetTable';
import RequestMesgGroup from './RequestMsgGroup';
import TableName from './TableName';
import TableBillPrice from './TableBillPrice';

import { useEffect, useRef, useState } from 'react';
import { Group, Rect, Transformer } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getClientTableList } from '../../../lib/features/itemState/itemSlice';

export default function TableLayer({ stage, table, clientTableList, setClientTableList }) {
  // useSelector
  const konvaEditTableIdArr = useSelector((state) => state.konvaState.target.id);
  const konvaEditType = useSelector((state) => state.konvaState.type);
  // variant
  const { init, order, tableNum, id } = table;
  const isTransformerAble = id === konvaEditTableIdArr[0] && konvaEditType !== 'delete';
  const isSelectedToDelete = konvaEditType === 'delete' && konvaEditTableIdArr.includes(id);
  const stageAttrs = stage.current.attrs;
  // useRef
  const shapeRef = useRef(null);
  const trRef = useRef(null);
  // useState
  const [requestMsg, hoverTable] = useState(initialMsgObj);
  const [hasAlert, getAlert] = useState(false);
  const [isEditEnd, setEditEnd] = useState(false);
  // useSelector
  const tableRequestAlertOn = useSelector((state) => state.realtimeState.tableRequestList.isOn);
  const requestTrigger = useSelector((state) => state.realtimeState.tableRequestList.trigger);
  // hook
  const { onClickOpenTableInfo } = useOpenTableInfo();
  const { onClickEditTable, onClickReadRequestMsg } = useEditTable();
  const { onMouseLeaveChangePointer, onMouseEnterChangePointer } = useOnMouseChangeCursor(stage, id);
  const { changeTablePosition, onDragTransform } = useSetTable(stage, init, shapeRef, setClientTableList);
  // useQuery
  const requestList = useQuery({
    queryKey: ['requestList', requestTrigger],
    queryFn: () => fetchTableRequestList('select'),
    initialData: [],
  });
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

  // 요청 알림을 끄면 테이블 메시지 등장
  // 요청이 많아지면 width가 너무 길어짐
  useEffect(() => {
    if (!requestList.data.length) return;
    if (!tableRequestAlertOn) {
      const isTableAlertUnRead = requestList.data.some(
        (request) => !request.isRead && request.tableNum === tableNum
      );
      if (isTableAlertUnRead) {
        getAlert(true);
        const requestArr = requestList.data.filter((request) => {
          return !request.isRead && request.tableNum === tableNum;
        });

        const msgContext = requestArr.reduce((prev, curr) => prev + ', ' + curr.requestList, '').slice(2);
        const msgLength = msgContext.replace(', ', '').split('').length;
        const msgWidth = msgLength * 23 + 20; // 기본 길이 + 뒷여백(20)
        const flip = init.x + init.rec.width + 20 + msgWidth >= stageAttrs.width;
        const newX = flip ? init.x - msgWidth - 20 : init.x + init.rec.width + 20;

        hoverTable((prev) => ({
          ...prev,
          list: [msgContext],
          table: init,
          pos: {
            x: newX,
            y: init.y,
            width: msgWidth,
            flip,
          },
        }));
      } else {
        getAlert(false);
      }
    } else {
      getAlert(false);
      hoverTable(initialMsgObj);
    }
  }, [requestList.data, tableRequestAlertOn]);

  // 좌석 모형 변환 제한값 설정
  function limitBoundBox(oldBox, newBox) {
    const newBoxWidth = Math.round(newBox.width);
    const oldBoxPosX = Math.round(oldBox.x);
    const newBoxHeight = Math.round(newBox.height);
    const oldBoxPosY = Math.round(oldBox.y);

    return {
      ...oldBox,
      width: 169 > newBoxWidth ? 168 : newBoxWidth,
      height: 129 > newBoxHeight ? 128 : newBoxHeight,
      x: oldBoxPosX,
      y: oldBoxPosY,
    };
  }
  // 좌석 선택 조건 별 처리
  function onClickSelectTable() {
    // 테이블 정보 창 열기
    onClickOpenTableInfo({ hasAlert, table });
    // 요청 알림 읽음 처리 (DB 연동 필요)
    onClickReadRequestMsg({ hasAlert, getAlert, hoverTable });
    // 테이블 편집 하기
    onClickEditTable({ stage, id });
  }
  // 좌석 변형 마지막 순간
  function onDragTransformEnd() {
    /*
      도형 변형은 매번 clientTableList가 변경되기 때문에
      변형 마지막 순간에 dispatch 적용

      isEditEnd 적용 시 변형 마지막 순간에 clientTableList가 갱신되지 않으므로 동작하지 않음
    */
    dispatch(getClientTableList({ clientTableList }));
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
        onMouseEnter={onMouseEnterChangePointer({ requestList })}
        onMouseLeave={onMouseLeaveChangePointer}
      >
        <Group>
          <Rect
            ref={shapeRef}
            width={init.rec.width}
            height={init.rec.height}
            fill={'#fff'}
            stroke={isSelectedToDelete ? 'red' : hasAlert ? '#4caff8' : 'white'}
            cornerRadius={10}
            onTransform={onDragTransform}
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
          <TableBillPrice order={order} bottom={init.bottom} />
        </Group>
      </Group>
      <RequestMesgGroup requestMsg={requestMsg} />
    </>
  );
}
