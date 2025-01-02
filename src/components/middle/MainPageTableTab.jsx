import styles from '@/style/middle/MainPageList.module.css';
import { changeKonvaIsEditingState, getEditKonvaTableId } from '../../lib/features/konvaState/konvaSlice';
import createKonvaInitTable from '../../lib/function/createKonvaInitTable';
import fetchTableList from '../../lib/supabase/func/fetchTableList';
import TableDraw from './konva/TableDraw';
import ErrorPage from '../ErrorPage';
import MainModal from '../modal/MainModal';
import { debounce } from '../../lib/function/debounce';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';

export default function MainPageTableTab() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  const konvaEditType = useSelector((state) => state.konvaState.type);
  const konvaEditIsEditing = useSelector((state) => state.konvaState.isEditing);
  // useQueries
  const tableList = useQuery({
    queryKey: ['tableList', isSubmit],
    queryFn: () => fetchTableList('select'),
    enabled: tab === 'table',
  });
  // useDispatch
  const dispatch = useDispatch();
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

  // konva 데이터 패치 완료 여부, 편집 중이면 반환
  useEffect(() => {
    if (tab !== 'table' || !tableBoxRef.current) return;
    if (tableList.data && !konvaEditIsEditing) {
      const isValideToOpen = tableBoxRef.current && tableList.data;
      // konva 열기
      setOpenKonva(isValideToOpen);
      // konva 좌석 정보 할당
      setClientTableList(tableList.data);
    }
  }, [tab, tableBoxRef, tableList.data, konvaEditIsEditing]);

  // konva 편집 유형 "create", 좌석 생성
  useEffect(() => {
    if (tab === 'table' && konvaEditType === 'create') {
      const newTable = createKonvaInitTable({ stageSize, clientTableList });
      setClientTableList((prev) => [...prev, newTable]);
      dispatch(getEditKonvaTableId({ id: [newTable.id] }));
    }
  }, [tab, konvaEditType]);

  // konva 편집 유형 "create/update", 편집 중 상태 설정
  useEffect(() => {
    if (!clientTableList?.length) return;
    // Konva 편집 하지 않을 때 상태 변경 제한
    if (!konvaEditType) return;
    // 배열 수정/추가되면 수정 중으로 상태 변경 (+ 요청 제한)
    if (konvaEditIsEditing) return;
    dispatch(changeKonvaIsEditingState({ isEditing: true }));
  }, [clientTableList]);

  if (tableList.isError) return <ErrorPage compName={'MainPageTableTab'} />;

  return (
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
  );
}
