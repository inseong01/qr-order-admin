
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';

import { Table } from '@/lib/supabase/function/table';
import { debounce } from '@/utils/function/optimize';
import { footerAtom } from '@/features/page/footer';
import mockData from '@/mock/table.test.json';

import TableStage from './stage';
import styles from './index.module.css';

// TODO: Konva 관련 로직 및 상태 관리 구현 필요
// import { createKonvaInitTable } from './function/konva';
// import { useQueryTableList } from '@/hooks/use-query/query';

export type StageSize = {
  stageWidth: number;
  stageHeight: number;
};
export type SetClientTableList = Dispatch<SetStateAction<Table[]>>;

export default function KonvaSection() {
  const tab = useAtomValue(footerAtom);
  const tableBoxRef = useRef<HTMLDivElement>(null);

  const [stageSize, setStageSize] = useState<StageSize>({
    stageWidth: window.innerWidth,
    stageHeight: window.innerHeight,
  });
  const [clientTableList, setClientTableList] = useState<Table[]>(mockData);

  // 기능: Konva Stage 크기 동적 조절
  useEffect(() => {
    if (tab !== 'table') return;
    const tableRef = tableBoxRef?.current;
    if (!tableRef) return;

    const updateSize = () => {
      setStageSize({
        stageWidth: tableRef.clientWidth,
        stageHeight: tableRef.clientHeight,
      });
    };
    updateSize();

    const debouncedResize = debounce(updateSize, 200);
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, [tab, tableBoxRef]);

  // 기능: Konva 좌석 데이터 패치 (주석 처리된 원본 로직)
  // useEffect(() => { ... });

  // 기능: Konva 좌석 생성 (주석 처리된 원본 로직)
  // useEffect(() => { ... });

  // 기능: Konva 데이터 리패치 (주석 처리된 원본 로직)
  // useEffect(() => { ... });

  // 기능: 좌석 정보 전역 상태와 동기화 (주석 처리된 원본 로직)
  // useEffect(() => { ... });

  return (
    <motion.div ref={tableBoxRef} className={styles.table} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {clientTableList.length === 0 ? (
        <div className={styles.title}>위젯에서 테이블을 생성해주세요</div>
      ) : (
        <TableStage stageSize={stageSize} clientTableList={clientTableList} setClientTableList={setClientTableList} />
      )}
    </motion.div>
  );
}
