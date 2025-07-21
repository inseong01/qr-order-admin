import Konva from 'konva';
import { motion } from 'motion/react';
import { useEffect, useMemo, useRef } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Layer, Rect, Stage, Text } from 'react-konva';

import { useQueryTableList } from '@/hooks/use-query/query';
import { windowStateAtom } from '@/store/atom/window-atom';

import { setTableStageAtom, tableAtom } from '../../store/table-atom';
import { draftTablesAtom, editModeAtom } from '../../store/table-edit-state';
import TableLayer from './layer';
import styles from './index.module.css';

export default function KonvaSection() {
  const { data } = useQueryTableList();

  const stageRef = useRef<Konva.Stage>(null);
  const editMode = useAtomValue(editModeAtom);
  // const { editMode } = useAtomValue(tableAtom);
  const { mainSection } = useAtomValue(windowStateAtom);
  const setTableStage = useSetAtom(setTableStageAtom);

  const [editableTables, onTableChange] = useAtom(draftTablesAtom); // refetch 동기화 필요
  const renderTables = editMode === 'update' || editMode === 'create' ? editableTables : (data ?? []);

  const stageScale = useMemo(() => {
    const isMobile = window.innerWidth <= 720 || window.innerHeight <= 720;
    return isMobile ? 0.49 : 1;
  }, [mainSection]);

  useEffect(() => {
    if (!stageRef.current) return;
    setTableStage(stageRef.current);
  }, [stageRef]);

  // editableTables 데이터 관리
  useEffect(() => {
    // create일 때 원본 데이터 사용 X
    if (editMode === 'create') return;

    if (data) {
      onTableChange(data);
    }
  }, [editMode, data, onTableChange]);

  return (
    <motion.div className={styles.table} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {data?.length === 0 ? (
        <div className={styles.title}>위젯에서 테이블을 생성해주세요</div>
      ) : (
        <Stage
          ref={stageRef}
          width={mainSection.width}
          height={mainSection.height}
          scaleX={stageScale}
          scaleY={stageScale}
          draggable={!editMode}
        >
          {/* 편집 모드 배경 */}
          <Layer opacity={editMode ? 1 : 0}>
            <Rect width={mainSection.width} height={mainSection.height} cornerRadius={12} fill='#b4b4b4' />
            <Text
              text='배경 내에서 좌석을 수정할 수 있습니다'
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
            {renderTables.map((table) => (
              <TableLayer key={table.id} table={table} onTableChange={onTableChange} />
            ))}
          </Layer>
        </Stage>
      )}
    </motion.div>
  );
}
