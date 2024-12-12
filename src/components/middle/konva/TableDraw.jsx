import styles from '@/style/middle/konva/TableDraw.module.css';
import TableLayer from './TableLayer';

import { Layer, Stage } from 'react-konva';
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';

// 상하 간격: clientHeight / (테이블 세로 항목 수 - 1)
const tableList = [
  {
    id: 'uuid',
    init: {
      x: 0,
      y: 0,
      rec: { width: 170, height: 130 },
      tableText: {
        width: 100,
      },
      bottom: {
        y: 90,
        line: { points: [0, 0, 130, 0] },
        priceText: {
          width: 130,
        },
      },
    },
    tableName: '테이블 1',
    orderList: [{}, {}],
  },
  {
    id: 'uuid',
    init: {
      x: 0,
      y: 178,
      rec: { width: 170, height: 130 },
      tableText: {
        width: 100,
      },
      line: { points: [0, 0, 130, 0] },
      priceText: {
        width: 130,
      },
    },
    tableName: '테이블 2',
    orderList: [{}, {}],
  },
  {
    id: 'uuid',
    init: {
      x: 0,
      y: 356,
      rec: { width: 170, height: 130 },
      tableText: {
        width: 100,
      },
      line: { points: [0, 0, 130, 0] },
      priceText: {
        width: 130,
      },
    },
    tableName: '테이블 3',
    orderList: [{}, {}],
  },
  {
    id: 'uuid',
    init: {
      x: 0,
      y: 534,
      rec: { width: 170, height: 130 },
      tableText: {
        width: 100,
      },
      line: { points: [0, 0, 130, 0] },
      priceText: {
        width: 130,
      },
    },
    tableName: '테이블 4',
    orderList: [{}, {}],
  },
  {
    id: 'uuid',
    init: {
      x: 240,
      y: 534,
      rec: { width: 340, height: 130 },
      tableText: {
        width: 300,
      },
      line: { points: [0, 0, 300, 0] },
      priceText: {
        width: 300,
      },
    },
    tableName: '테이블 5',
    orderList: [{}, {}],
  },
  {
    id: 'uuid',
    init: {
      x: 650,
      y: 534,
      rec: { width: 340, height: 130 },
      tableText: {
        width: 300,
      },
      line: { points: [0, 0, 300, 0] },
      priceText: {
        width: 300,
      },
    },
    tableName: '테이블 6',
    orderList: [{}, {}],
  },
  {
    id: 'uuid',
    init: {
      x: 1104,
      y: 534,
      rec: { width: 170, height: 130 },
      tableText: {
        width: 100,
      },
      line: { points: [0, 0, 130, 0] },
      priceText: {
        width: 130,
      },
    },
    tableName: '테이블 7',
    orderList: [{}, {}],
  },
  {
    id: 'uuid',
    init: {
      x: 1104,
      y: 356,
      rec: { width: 170, height: 130 },
      tableText: {
        width: 100,
      },
      line: { points: [0, 0, 130, 0] },
      priceText: {
        width: 130,
      },
    },
    tableName: '테이블 8',
    orderList: [{}, {}],
  },
  {
    id: 'uuid',
    init: {
      x: 1104,
      y: 178,
      rec: { width: 170, height: 130 },
      tableText: {
        width: 100,
      },
      line: { points: [0, 0, 130, 0] },
      priceText: {
        width: 130,
      },
    },
    tableName: '테이블 9',
    orderList: [{}, {}],
  },
  {
    id: 'uuid',
    init: {
      x: 1104,
      y: 0,
      rec: { width: 170, height: 130 },
      tableText: {
        width: 100,
      },
      line: { points: [0, 0, 130, 0] },
      priceText: {
        width: 130,
      },
    },
    tableName: '테이블 10',
    orderList: [{}, {}],
  },
];

export default function TableDraw({ stageSize, tableList, setClientTableList, selectTableId }) {
  // useSelector
  const konvaEditTableIdArr = useSelector((state) => state.konvaState.target.id);
  const konvaEditType = useSelector((state) => state.konvaState.type);
  // useRef
  const stageRef = useRef(null);
  // useState
  const [isResetPos, resetPos] = useState(false);
  const [currentPos, setCurrentPos] = useState({
    x: 0,
    y: 0,
  });

  function backToInitPos() {
    resetPos(true);
  }

  function getLastPos() {
    const lastPos = stageRef.current.position();
    setCurrentPos(lastPos);
    resetPos(false);
  }

  return (
    <Stage
      ref={stageRef}
      x={isResetPos ? 0 : currentPos.x}
      y={isResetPos ? 0 : currentPos.y}
      width={stageSize.stageWidth}
      height={stageSize.stageHeight}
      className={`${styles.stage} ${konvaEditType ? styles.editStroke : ''}`}
      onDblClick={backToInitPos}
      onDblTap={backToInitPos}
      onDragEnd={getLastPos}
    >
      <Layer>
        {tableList.map((table) => {
          return (
            <TableLayer
              key={table.id}
              stage={stageRef}
              table={table}
              setClientTableList={setClientTableList}
              konvaEditTableIdArr={konvaEditTableIdArr}
              selectTableId={selectTableId}
              konvaEditType={konvaEditType}
            />
          );
        })}
      </Layer>
    </Stage>
  );
}
