import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';

import { Table } from '@/lib/supabase/function/table';
import { debounce } from '@/utils/function/optimize';
import { footerAtom } from '@/features/page/footer';
import mockData from '@/mock/table.test.json';

import TableStage from './stage';

import styles from './index.module.css';

// import { createKonvaInitTable } from './function/konva';
// import { useQueryTableList } from '@/hooks/use-query/query';

export type StageSize = {
  stageWidth: number;
  stageHeight: number;
};
export type SetClientTableList = Dispatch<SetStateAction<Table[]>>;

export default function KonvaSection() {
  const tab = useAtomValue(footerAtom);
  // const tab = useBoundStore((state) => state.tab.title);
  // const submitStatus = useBoundStore((state) => state.submit.status);
  // const konvaEditType = useBoundStore((state) => state.konva.type);
  // const konvaEditIsEditing = useBoundStore((state) => state.konva.isEditing);
  // const getEditKonvaTableId = useBoundStore((state) => state.getEditKonvaTableId);
  // const getClientTableList = useBoundStore((state) => state.getClientTableList);

  // const { data, isFetching, refetch } = useQueryTableList();

  const tableBoxRef = useRef<HTMLDivElement>(null);

  const [stageSize, setStageSize] = useState<StageSize>({
    stageWidth: window.innerWidth,
    stageHeight: window.innerHeight,
  });
  const [clientTableList, setClientTableList] = useState<Table[]>(mockData);
  const [openKonva, setOpenKonva] = useState(false);

  // konva Stage 크기 설정
  useEffect(() => {
    if (tab !== 'table') return;

    const tableRef = tableBoxRef?.current;
    if (!tableRef) return;

    // 너비 높이 할당
    setStageSize(() => {
      return {
        stageWidth: tableRef.clientWidth,
        stageHeight: tableRef.clientHeight,
      };
    });

    // Konva 화면 리사이즈
    function onResizeStageSize() {
      if (tableRef) {
        setStageSize(() => ({
          stageWidth: tableRef.clientWidth,
          stageHeight: tableRef.clientHeight,
        }));
      }
    }

    window.addEventListener('resize', debounce(onResizeStageSize, 200));
    return () => {
      window.removeEventListener('resize', debounce(onResizeStageSize, 200));
    };
  }, [tab, tableBoxRef]);

  // konva 좌석 데이터 패치
  // useEffect(() => {
  //   /*
  //     konvaEditIsEditing 의존성 추가하면
  //     이전 데이터 적용 후 최신 데이터 적용됨
  //   */
  //   if (!data) return; // 초기 데이터가 undefined이면
  //   if (isFetching) return; // 새로운 데이터 받아오는 중이면
  //   if (!tableBoxRef.current) return; // Konva Stage가 없으면
  //   if (konvaEditIsEditing) return; // Konva 편집 중이면

  //   setOpenKonva(true); // konva 열기

  //   setClientTableList(data ?? []); // konva 좌석 정보 할당
  // }, [tableBoxRef, data, isFetching]);

  // konva 편집 유형 "insert", 좌석 생성
  // useEffect(() => {
  //   /* 필요 인자들 Widget으로 전달하기 어려워 useEffect 사용 */
  //   if (konvaEditType === 'insert') {
  //     const newTable = createKonvaInitTable({ stageSize, clientTableList });
  //     setClientTableList((prev) => [...prev, newTable]);
  //     getEditKonvaTableId({ id: [newTable.id] });
  //   }
  // }, [konvaEditType]);

  // konva 좌석 데이터 리패치 조건
  // useEffect(() => {
  //   /*
  //     useQueryTableList는 좌석 정보를 가져오는 select 함수
  //     : insert/update 에러는 useFetchSlice.js에서 받을 수 있음

  //     리패치 조건
  //     : status === '', 'fulfilled', 'rejected'
  //       - '': 초기 데이터
  //       - fulfilled: 생성/갱신 이후 데이터
  //       - rejected: 이전 데이터
  //   */
  //   if (submitStatus === 'pending') return;
  //   refetch();
  // }, [submitStatus]);

  // // 좌석 정보 갱신, 패치 요청
  // useEffect(() => {
  //   getClientTableList({ clientTableList }); // 수정/추가된 테이블 배열 전달
  // }, [clientTableList]);

  return (
    <motion.div className={styles.table} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {clientTableList.length === 0 ? (
        <div className={styles.title}>위젯에서 테이블을 생성해주세요</div>
      ) : (
        <TableStage stageSize={stageSize} clientTableList={clientTableList} setClientTableList={setClientTableList} />
      )}
    </motion.div>
  );
}
