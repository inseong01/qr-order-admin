import styles from '@/style/middle/konva/TableDraw.module.css';
import TableLayer from './TableLayer';

import { Layer, Stage } from 'react-konva';
import { Provider, ReactReduxContext, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchTableRequestList from '../../../lib/supabase/func/fetchTableRequestList';

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
  // useSelector
  const requestTrigger = useSelector((state) => state.realtimeState.tableRequestList.trigger);
  // useQuery
  const requestList = useQuery({
    queryKey: ['requestList', requestTrigger],
    queryFn: () => fetchTableRequestList('select'),
    initialData: [],
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
    <ReactReduxContext.Consumer>
      {({ store }) => {
        const state = store.getState();
        const dispatch = store.dispatch;
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
                    dispatch={dispatch}
                    state={state}
                    requestList={requestList}
                  />
                );
              })}
            </Layer>
          </Stage>
        );
      }}
    </ReactReduxContext.Consumer>
  );
}
