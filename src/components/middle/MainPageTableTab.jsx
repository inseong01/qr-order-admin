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
  const konvaEditType = useBoundStore((state) => state.konva.type);
  const konvaEditIsEditing = useBoundStore((state) => state.konva.isEditing);
  const getEditKonvaTableId = useBoundStore((state) => state.getEditKonvaTableId);
  // useQuery
  const tableList = useQueryTableList();
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

  // konva 좌석 데이터 패치, 편집 중이면 반환
  useEffect(() => {
    // 좌석 데이터가 없다면
    if (!tableList.data) return;
    // 새로 받아오는 중이면
    if (tableList.isFetching) return;
    // Konva Stage가 없으면
    if (!tableBoxRef.current) return;
    // Konva 편집 중이면
    if (konvaEditIsEditing) return;
    // konva 열기
    setOpenKonva(true);
    // konva 좌석 정보 할당
    setClientTableList(tableList.data);
  }, [tableBoxRef, tableList, konvaEditIsEditing]);

  // konva 편집 유형 "create", 좌석 생성
  useEffect(() => {
    /* 필요 인자들 Widget으로 전달하기 어려워 useEffect 사용 */
    if (konvaEditType === 'create') {
      const newTable = createKonvaInitTable({ stageSize, clientTableList });
      setClientTableList((prev) => [...prev, newTable]);
      getEditKonvaTableId({ id: [newTable.id] });
    }
  }, [konvaEditType]);

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
