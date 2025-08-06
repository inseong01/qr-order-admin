import Konva from 'konva';
import { useEffect, useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { Layer, Rect, Stage, Text } from 'react-konva';
import { Tween } from 'konva/lib/Tween';

import { useQueryOrderItems, useQueryTableList } from '@/hooks/use-query/query';
import { windowStateAtom } from '@/store/window-atom';

import { draftTablesAtom, editModeAtom, selectedTableIdsAtom } from '../../store/table-edit-state';
import { setTableStageAtom } from '../../store/table-state';
import { setStagePositionStateAtom, stagePositionStateAtom } from './store/atom';
import { setEditDescription } from './function/set-edit-description';
import TableLayer from './layer';

export default function KonvaSection() {
  const tablesQuery = useQueryTableList();
  const orderList = useQueryOrderItems();
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

  const editLayerRef = useRef<Konva.Layer>(null);

  /** 좌석 편집 모드 여부에 따른 배경 애니메이션 */
  useEffect(() => {
    if (!editLayerRef?.current) return;
    if (!editMode) {
      const fadeOut = new Tween({
        node: editLayerRef.current,
        duration: 0.3,
        opacity: 0,
        easing: Konva.Easings.EaseInOut,
      });
      fadeOut.play();
      return;
    }

    const fadeIn = new Tween({
      node: editLayerRef.current,
      duration: 0.3,
      opacity: 1,
      easing: Konva.Easings.EaseInOut,
    });
    fadeIn.play();
    return;
  }, [editMode]);

  return (
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
      <Layer ref={editLayerRef} opacity={0}>
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
  );
}
