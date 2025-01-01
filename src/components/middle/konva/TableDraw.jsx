import styles from '@/style/middle/konva/TableDraw.module.css';
import TableLayer from './TableLayer';

import { Layer, Stage } from 'react-konva';
import { Provider, ReactReduxContext, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function TableDraw({ stageSize, clientTableList, setClientTableList }) {
  // useSelector
  const konvaEditType = useSelector((state) => state.konvaState.type);
  const konvaEditIsAble = useSelector((state) => state.konvaState.isAble);
  // useRef
  const stageRef = useRef(null);
  // useState
  const [currentPos, setCurrentPos] = useState({
    x: 0,
    y: 0,
  });

  // 초기 위치 화면 이동
  function backToInitPos() {
    setCurrentPos({ x: 0, y: 0 });
  }

  // 드래그 위치 화면 이동
  function getLastPos() {
    const lastPos = stageRef.current.position();
    setCurrentPos({ x: lastPos.x, y: lastPos.y });
  }

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        const queryClient = new QueryClient();
        return (
          <Stage
            ref={stageRef}
            x={konvaEditIsAble ? 0 : currentPos.x}
            y={konvaEditIsAble ? 0 : currentPos.y}
            width={stageSize.stageWidth}
            height={stageSize.stageHeight}
            className={`${styles.stage} ${konvaEditType ? styles.editStroke : ''}`}
            onDblClick={backToInitPos}
            onDblTap={backToInitPos}
            onDragEnd={getLastPos}
            draggable={!konvaEditIsAble}
          >
            <Provider store={store}>
              <QueryClientProvider client={queryClient}>
                <Layer>
                  {clientTableList.map((table) => {
                    return (
                      <TableLayer
                        key={table.id}
                        table={table}
                        stage={stageRef}
                        clientTableList={clientTableList}
                        setClientTableList={setClientTableList}
                      />
                    );
                  })}
                </Layer>
              </QueryClientProvider>
            </Provider>
          </Stage>
        );
      }}
    </ReactReduxContext.Consumer>
  );
}
