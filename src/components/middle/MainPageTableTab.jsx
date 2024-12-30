import styles from '@/style/middle/MainPageList.module.css';
import { changeKonvaIsEditingState, getEditKonvaTableId } from '../../lib/features/konvaState/konvaSlice';
import { getClientTableList, getItemInfo, selectTable } from '../../lib/features/itemState/itemSlice';
import { changeModalState } from '../../lib/features/modalState/modalSlice';
import createKonvaInitTable from '../../lib/function/createKonvaInitTable';
import fetchTableList from '../../lib/supabase/func/fetchTableList';
import TableDraw from './konva/TableDraw';
import ErrorPage from '../ErrorPage';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Provider, ReactReduxContext, useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import MainModal from '../modal/MainModal';

export default function MainPageTableTab() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  const konvaEditType = useSelector((state) => state.konvaState.type);
  const konvaEditIsAble = useSelector((state) => state.konvaState.isAble);
  const konvaEditIsEditing = useSelector((state) => state.konvaState.isEditing);
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
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
    window.addEventListener('resize', onResizeStageSize);

    return () => {
      window.removeEventListener('resize', onResizeStageSize);
    };
  }, [tab, tableBoxRef]);

  // konva 데이터 패치 완료 여부, 편집 중이면 반환
  useEffect(() => {
    if (tab !== 'table' || !tableBoxRef.current) return;
    if (!tableList.isFetched || konvaEditIsEditing) return;
    const isValideToOpen = tableBoxRef.current && tableList.data;
    setOpenKonva(isValideToOpen);
    setClientTableList(tableList.data);
  }, [tab, tableBoxRef, tableList, konvaEditIsEditing]);

  // konva 편집 유형 "create", 좌석 생성
  useEffect(() => {
    if (tab !== 'table' || konvaEditType !== 'create') return;
    const newTable = createKonvaInitTable({ stageSize, clientTableList });
    setClientTableList((prev) => [...prev, newTable]);
    dispatch(getEditKonvaTableId({ id: [newTable.id] }));
  }, [tab, konvaEditType]);

  // konva 편집 유형 "create/update", clientTableList 배열 업데이트
  useEffect(() => {
    if (!clientTableList?.length) return;
    // 수정/추가된 테이블 배열 전달
    dispatch(getClientTableList({ clientTableList }));
    // 배열 수정/추가되면 수정 중으로 상태 변경
    if (!konvaEditType) return;
    dispatch(changeKonvaIsEditingState({ isEditing: true }));
  }, [clientTableList]);

  if (tableList.isError) return <ErrorPage compName={'MainPageTableTab'} />;

  return (
    <div className={`${styles.listBox} ${tab === 'table' ? styles.table : ''}`} ref={tableBoxRef}>
      {openKonva && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <TableDraw
            stageSize={stageSize}
            tableList={clientTableList}
            setClientTableList={setClientTableList}
          />
        </motion.div>
      )}
      <MainModal />
    </div>
  );
}
