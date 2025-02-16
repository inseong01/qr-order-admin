import { useBoundStore } from '../../store/useBoundStore';
import { SetClientTableList } from '../../../components/middle/konva/KonvaSection';
import { TableInit } from '../../../types/common';
import { OnDrageEndEvent } from '../../../components/middle/konva/TableLayer';

import Konva from 'konva';
import { RefObject } from 'react';

export default function useSetTable(
  stageRef: RefObject<Konva.Stage>,
  shapeRef: RefObject<Konva.Rect>,
  setClientTableList: SetClientTableList
) {
  // store
  const konvaEditTableIdArr = useBoundStore((state) => state.konva.target.id);
  // variant
  const blockSize = 10;

  // 변경된 좌석 위치 적용
  function changeTablePosition(e: OnDrageEndEvent) {
    if (!stageRef.current) return;
    // 커서 모양 변경
    stageRef.current.container().style.cursor = 'move';
    // 마지막 위치
    const lastPos = e.target.position();
    // 이동한 좌석 위치 변경
    setClientTableList((prev) =>
      prev.map((table) => {
        if (table.id === konvaEditTableIdArr[0]) {
          let newPosX = lastPos.x;
          let newPosY = lastPos.y;
          const tableInit = table.init as TableInit;
          return { ...table, init: { ...tableInit, x: newPosX, y: newPosY } };
        }
        return table;
      })
    );
  }

  function onDragTransform() {
    if (!shapeRef.current) return;
    // 크기 변형 적용 객체
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    // node 초기화
    node.scaleX(1);
    node.scaleY(1);
    // 크기 변환 적용
    setClientTableList((prev) => {
      return prev.map((table) => {
        const tableInit = table.init as TableInit;
        if (table.id === konvaEditTableIdArr[0]) {
          const newWidth = Math.max(170, Math.round((node.width() * scaleX) / blockSize) * blockSize);
          const newHeight = Math.max(130, Math.round((node.height() * scaleY) / blockSize) * blockSize);
          return {
            ...table,
            init: {
              ...tableInit,
              rec: {
                width: newWidth,
                height: newHeight,
              },
              tableText: {
                width: newWidth - 40,
              },
              bottom: {
                ...tableInit.bottom,
                y: newHeight - 40,
                line: { points: [0, 0, newWidth - 40, 0] },
                priceText: {
                  width: newWidth - 40,
                },
              },
            },
          };
        }
        return table;
      });
    });
  }

  return { changeTablePosition, onDragTransform };
}
