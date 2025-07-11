import { useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';

import { debounce } from '@/utils/function/optimize';
import { footerAtom } from '@/features/page/footer';

import { tableAtom } from '../../store/table-atom';
import TableStage from './stage';
import styles from './index.module.css';

export type StageSize = {
  stageWidth: number;
  stageHeight: number;
};

export default function KonvaSection() {
  const tab = useAtomValue(footerAtom);
  const { tables } = useAtomValue(tableAtom);

  const tableBoxRef = useRef<HTMLDivElement>(null);

  const [stageSize, setStageSize] = useState<StageSize>({
    stageWidth: window.innerWidth,
    stageHeight: window.innerHeight,
  });

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
      {tables.length === 0 ? (
        <div className={styles.title}>위젯에서 테이블을 생성해주세요</div>
      ) : (
        <TableStage stageSize={stageSize} />
      )}
    </motion.div>
  );
}
