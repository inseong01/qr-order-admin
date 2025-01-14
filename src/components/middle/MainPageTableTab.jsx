import styles from '@/style/middle/MainPageList.module.css';
import createKonvaInitTable from '../../lib/function/createKonvaInitTable';
import { debounce } from '../../lib/function/debounce';
import useQueryTableList from '../../lib/hook/useQuery/useQueryTableList';
import { useBoundStore } from '../../lib/store/useBoundStore';
import TableAlertMsg from '../alertMsg/TableAlertMsg';
import TableDraw from './konva/TableDraw';
import MainModal from '../modal/MainModal';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export default function MainPageTableTab() {
  // store
  const tab = useBoundStore((state) => state.tab.title);
  const submitStatus = useBoundStore((state) => state.submit.status);
  const konvaEditType = useBoundStore((state) => state.konva.type);
  const konvaEditIsEditing = useBoundStore((state) => state.konva.isEditing);
  const konvaIsEditEnd = useBoundStore((state) => state.konva.isEditEnd);
  const getEditKonvaTableId = useBoundStore((state) => state.getEditKonvaTableId);
  const getClientTableList = useBoundStore((state) => state.getClientTableList);
  const setKonvaEditEnd = useBoundStore((state) => state.setKonvaEditEnd);
  // useQuery
  const { data, isFetching, refetch } = useQueryTableList();
  // useRef
  const tableBoxRef = useRef(null);
  // useState
  const [stageSize, setStageSize] = useState({
    stageWidth: 0,
    stageHeight: 0,
  });
  const [clientTableList, setClientTableList] = useState([]);
  const [openKonva, setOpenKonva] = useState(false);

  // konva Stage 크기 설정
  useEffect(() => {
    if (tab !== 'table' || !tableBoxRef.current) return;
    // 너비 높이 할당
    setStageSize(() => ({
      stageWidth: tableBoxRef.current.clientWidth,
      stageHeight: tableBoxRef.current.clientHeight,
    }));
    // 리사이즈
    function onResizeStageSize() {
      setStageSize(() => ({
        stageWidth: tableBoxRef.current.clientWidth,
        stageHeight: tableBoxRef.current.clientHeight,
      }));
    }
    window.addEventListener('resize', debounce(onResizeStageSize, 200));
    return () => {
      window.removeEventListener('resize', debounce(onResizeStageSize, 200));
    };
  }, [tab, tableBoxRef]);

  // konva 좌석 데이터 패치
  useEffect(() => {
    /*
      konvaEditIsEditing 의존성 추가하면 
      이전 데이터 적용 후 최신 데이터 적용됨
    */
    // 데이터가 없다면
    if (!data) return;
    // 새로 받아오는 중이면
    if (isFetching) return;
    // Konva Stage가 없으면
    if (!tableBoxRef.current) return;
    // Konva 편집 중이면
    if (konvaEditIsEditing) return;
    // konva 열기
    setOpenKonva(true);
    // konva 좌석 정보 할당
    setClientTableList(data.data ?? []);
  }, [tableBoxRef, data, isFetching]);

  // konva 편집 유형 "create", 좌석 생성
  useEffect(() => {
    /* 필요 인자들 Widget으로 전달하기 어려워 useEffect 사용 */
    if (konvaEditType === 'create') {
      const newTable = createKonvaInitTable({ stageSize, clientTableList });
      setClientTableList((prev) => [...prev, newTable]);
      getEditKonvaTableId({ id: [newTable.id] });
    }
  }, [konvaEditType]);

  // konva 좌석 데이터 리패치 조건
  useEffect(() => {
    /*
      useQueryTableList는 좌석 정보를 가져오는 select 함수
      : insert/update 에러는 useFetchSlice.js에서 받을 수 있음 

      리패치 조건
      : status === '', 'fulfilled', 'rejected'
        - '': 초기 데이터
        - fulfilled: 생성/갱신 이후 데이터
        - rejected: 이전 데이터 
    */
    if (submitStatus === 'pending') return;
    refetch();
  }, [submitStatus]);

  // 좌석 정보 갱신, 패치 요청
  useEffect(() => {
    /*
        konvaIsEditEnd true일 때 패치 요청  
        클라이언트, 마지막 선택마다 좌석 정보 최신화/상태 저장 
        
        "konvaIsEditEnd" 의존성 추가하면 최신화 이전 값 저장됨 
      */
    if (konvaIsEditEnd) {
      // 수정/추가된 테이블 배열 전달
      getClientTableList({ clientTableList });
    }
    setKonvaEditEnd({ isEditEnd: false });
  }, [clientTableList]);

  return (
    <>
      <div className={`${styles.listBox} ${tab === 'table' ? styles.table : ''}`} ref={tableBoxRef}>
        {openKonva && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <TableDraw
              stageSize={stageSize}
              clientTableList={clientTableList}
              setClientTableList={setClientTableList}
            />
          </motion.div>
        )}
        <MainModal />
      </div>
      <TableAlertMsg />
    </>
  );
}
