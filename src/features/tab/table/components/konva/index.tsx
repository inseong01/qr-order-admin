import Konva from 'konva';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { Layer, Rect, Stage, Text } from 'react-konva';

import { useQueryOrderMenuList, useQueryTableList } from '@/hooks/use-query/query';
import { windowStateAtom } from '@/store/atom/window-atom';

import { draftTablesAtom, editModeAtom, selectedTableIdsAtom } from '../../store/table-edit-state';
import { setTableStageAtom } from '../../store/table-state';
import { setStagePositionStateAtom, stagePositionStateAtom } from './store/atom';
import { setEditDescription } from './function/set-edit-description';
import TableLayer from './layer';
import styles from './index.module.css';

export default function KonvaSection() {
  const tablesQuery = useQueryTableList();
  const orderList = useQueryOrderMenuList();
  const stageRef = useRef<Konva.Stage>(null);
  const editMode = useAtomValue(editModeAtom);
  const draftTables = useAtomValue(draftTablesAtom);
  const tableIds = useAtomValue(selectedTableIdsAtom);
  const { mainSection } = useAtomValue(windowStateAtom);
  const { x, y } = useAtomValue(stagePositionStateAtom);
  const setTableStage = useSetAtom(setTableStageAtom);
  const setStagePositionState = useSetAtom(setStagePositionStateAtom);

  const needDraft = editMode === 'update' || editMode === 'create';
  const renderTables = needDraft ? draftTables : (tablesQuery?.data ?? []);
  const editDescription = setEditDescription(editMode, Boolean(tableIds.length));

  /* stageRef 관리 */
  useEffect(() => {
    if (!stageRef.current) return;
    setTableStage(stageRef.current);
  }, [stageRef]);

  /* 드래그 화면 위치 초기화 */
  function resetStagePosition() {
    if (editMode) return;
    if (x === 0 && y === 0) return;
    setStagePositionState({ x: 0, y: 0 });
  }

  /* 화면 드래그 위치 동기화 */
  function setLastDragPosition() {
    if (!stageRef.current) return;
    const lastPos = stageRef.current.position();
    setStagePositionState({ x: lastPos.x, y: lastPos.y });
  }

  return (
    <motion.div className={styles.table} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {tablesQuery.data?.length === 0 ? (
        <div className={styles.title}>위젯에서 테이블을 생성해주세요</div>
      ) : (
        <Stage
          draggable
          ref={stageRef}
          x={editMode ? 0 : x}
          y={editMode ? 0 : y}
          width={mainSection.width}
          height={mainSection.height}
          onDblClick={resetStagePosition}
          onDblTap={resetStagePosition}
          onDragEnd={setLastDragPosition}
        >
          {/* 편집 모드 배경 */}
          <Layer opacity={editMode ? 1 : 0}>
            <Rect width={mainSection.width} height={mainSection.height} cornerRadius={0} fill='#b4b4b4' />
            <Text
              text={editDescription}
              width={mainSection.width}
              height={mainSection.height}
              align='center'
              verticalAlign='middle'
              fontSize={20}
              fill='white'
            />
          </Layer>

          {/* 테이블 목록 */}
          <Layer>
            {renderTables.map((table) => {
              const orders = orderList.data?.filter((d) => d.order?.table.id === table.id) ?? [];
              return <TableLayer key={table.id} table={table} orders={orders} />;
            })}
          </Layer>
        </Stage>
      )}
    </motion.div>
  );
}
