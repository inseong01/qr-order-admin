import Konva from 'konva';
import { motion } from 'motion/react';
import { useEffect, useMemo, useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { Layer, Rect, Stage, Text } from 'react-konva';

import { useQueryOrderMenuList, useQueryTableList } from '@/hooks/use-query/query';
import { windowStateAtom } from '@/store/atom/window-atom';

import { draftTablesAtom, editModeAtom, setDraftTableAtom } from '../../store/table-edit-state';
import { setTableStageAtom } from '../../store/table-state';
import TableLayer from './layer';
import styles from './index.module.css';

export default function KonvaSection() {
  const tablesQuery = useQueryTableList();
  const orderList = useQueryOrderMenuList();
  const stageRef = useRef<Konva.Stage>(null);
  const editMode = useAtomValue(editModeAtom);
  const draftTables = useAtomValue(draftTablesAtom);
  const { mainSection } = useAtomValue(windowStateAtom);
  const setTableStage = useSetAtom(setTableStageAtom);
  const setDraftTables = useSetAtom(setDraftTableAtom);

  const needDraft = editMode === 'update' || editMode === 'create';
  const renderTables = needDraft ? draftTables : (tablesQuery?.data ?? []);

  const stageScale = useMemo(() => {
    const isMobile = window.innerWidth <= 720 || window.innerHeight <= 720;
    return isMobile ? 0.49 : 1;
  }, [mainSection]);

  /* stageRef 관리 */
  useEffect(() => {
    if (!stageRef.current) return;
    setTableStage(stageRef.current);
  }, [stageRef]);

  /* editableTables 데이터 관리 */
  useEffect(() => {
    if (editMode === 'create') return; // create일 때 원본 데이터 사용 X
    if (tablesQuery.data) {
      setDraftTables(tablesQuery.data);
    }
  }, [editMode, tablesQuery.data, setDraftTables]);

  return (
    <motion.div className={styles.table} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {tablesQuery.data?.length === 0 ? (
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
