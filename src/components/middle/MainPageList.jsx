import styles from '@/style/middle/MainPageList.module.css';
import OrderListSwiper from '../swiper/OrderListSwiper';
import CompletedOrderListSwiper from '../swiper/CompletedOrderListSwiper';
import getAllOrderList from '@/lib/supabase/func/getAllOrderList';
import Loader from '../Loader';
import MenuList from './MenuList';
import AddMenuModal from '../modal/AddMenuModal';
import ConfirmModal from '../modal/ConfirmModal';
import TableDraw from '../middle/konva/TableDraw';
import { changeSubmitState } from '@/lib/features/submitState/submitSlice';
import fetchTableList from '../../lib/supabase/func/fetchTableList';

import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getEditKonvaTableId } from '../../lib/features/konvaState/konvaSlice';
import { getClientTableList } from '../../lib/features/itemState/itemSlice';

// customer
// 고객이 서버로 속성 항목에 맞춰 보냄
// 고객 주문 목록 속성 항목: id, name, price, sort, amount
// const customerOrderList = [
//   { id: 1, name: '음식 0', price: 1000, sort: '', amount: 1 },
//   { id: 2, name: '음식 1', price: 1000, sort: '', amount: 1 },
//   { id: 3, name: '음식 2', price: 1000, sort: '', amount: 1 },
//   { id: 4, name: '음식 3', price: 1000, sort: '', amount: 1 },
//   { id: 5, name: '음식 4', price: 1000, sort: '', amount: 1 },
//   { id: 6, name: '음식 5', price: 1000, sort: '', amount: 1 },
//   { id: 7, name: '음식 6', price: 1000, sort: '', amount: 1 },
//   { id: 8, name: '음식 7', price: 1000, sort: '', amount: 1 },
//   { id: 9, name: '음식 8', price: 1000, sort: '', amount: 1 },
// ]; // id = 음식 식별자 번호

// admin
// 주문 항목이 있다면 실시간으로 가져옴
// 모든 주문 목록 속성 항목: id, title, totalPrice, customerOrderList
// const allOrderList = [
//   { id: 0, totalPrice: '10,000', customerOrderList, isDone: false },
//   { id: 1, totalPrice: '10,000', customerOrderList, isDone: false },
//   { id: 2, totalPrice: '10,000', customerOrderList, isDone: false },
//   { id: 3, totalPrice: '10,000', customerOrderList, isDone: false },
//   { id: 4, totalPrice: '10,000', customerOrderList, isDone: false },
//   { id: 5, totalPrice: '10,000', customerOrderList, isDone: false },
//   { id: 6, totalPrice: '10,000', customerOrderList, isDone: false },
//   { id: 7, totalPrice: '10,000', customerOrderList, isDone: false },
//   { id: 8, totalPrice: '10,000', customerOrderList, isDone: false },
//   { id: 9, totalPrice: '10,000', customerOrderList, isDone: false },
// ]; // id = 주문 고유 식별자

export default function MainPageList() {
  // useSelector
  const tab = useSelector((state) => state.tabState.state);
  const type = useSelector((state) => state.tabState.state);
  const selectedCategory = useSelector((state) => state.categoryState);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  const konvaEditType = useSelector((state) => state.konvaState.type);
  const konvaEditisAble = useSelector((state) => state.konvaState.isAble);
  const konvaEditisEditing = useSelector((state) => state.konvaState.isEditing);
  // useQueries
  const [allOrderList, tableList] = useQueries({
    queries: [
      {
        // 배열 업데이트 적용하기
        queryKey: ['allOrderList', isSubmit],
        queryFn: () => getAllOrderList('order'),
        enabled: tab === 'table' || tab === 'order',
        select: (data) => {
          return data.sort((a, b) => a.orderNum - b.orderNum);
        },
      },
      {
        queryKey: ['tableList', isSubmit],
        queryFn: () => fetchTableList('select'),
        enabled: tab === 'table',
      },
    ],
  });
  // useRef
  const tableBoxRef = useRef(null);
  // useState
  const [stageSize, setStageSize] = useState({
    stageWidth: 0,
    stageHeight: 0,
  });
  const [clientTableList, setClientTableList] = useState([]);
  const [openKonva, setOpenKonva] = useState(false);

  // useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // 주문 탭이고 제출했을 때 동작
    if (tab !== 'order' && !isSubmit) return;
    dispatch(changeSubmitState({ isSubmit: false }));
  }, [tab, allOrderList]);

  useEffect(() => {
    // konva Stage 크기 설정
    if (tab !== 'table' || !tableBoxRef.current) return;

    // konva 너비 높이 할당
    setStageSize(() => ({
      stageWidth: tableBoxRef.current.clientWidth,
      stageHeight: tableBoxRef.current.clientHeight,
    }));

    // konva 너비 높이 리사이즈
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

  useEffect(() => {
    // konva 데이터 패치 완료 여부, 편집 중이면 반환
    if (tab !== 'table' || !tableBoxRef.current || !tableList.isFetched || konvaEditisEditing) return;
    const isValideToOpen = tableBoxRef.current && tableList.data;
    setOpenKonva(isValideToOpen);
    setClientTableList(tableList.data);
  }, [tab, tableBoxRef, tableList, konvaEditisEditing]);

  useEffect(() => {
    // konva edit 실행
    if (tab !== 'table') return;
    switch (konvaEditType) {
      case 'create': {
        // 좌석 생성
        const newTable = {
          id: uuidv4(),
          init: {
            x: stageSize.stageWidth / 2,
            y: stageSize.stageHeight / 2,
            rec: { width: 170, height: 130 },
            tableText: {
              width: 100,
            },
            bottom: {
              y: 90,
              line: { points: [0, 0, 130, 0] },
              priceText: {
                width: 130,
              },
            },
          },
          tableName: `테이블 ${clientTableList.length + 1}`,
          orderList: [],
        };
        setClientTableList((prev) => [...prev, newTable]);
        dispatch(getEditKonvaTableId({ id: newTable.id }));
        return;
      }
      default: {
        return;
      }
    }
  }, [tab, konvaEditType, konvaEditisAble]);

  useEffect(() => {
    // clientTableList 배열 업데이트 되면 추가된 테이블 전달
    if (!clientTableList.length) return;
    dispatch(getClientTableList({ clientTableList }));
  }, [clientTableList]);

  // motion
  const ul_motion = {
    load: {},
    notLoad: {},
  };

  switch (type) {
    case 'menu': {
      return (
        <>
          <motion.ul className={styles.listBox} variants={ul_motion} initial={'notLoad'} animate={'load'}>
            <MenuList />
          </motion.ul>
          <AddMenuModal />
        </>
      );
    }
    case 'table': {
      return (
        <div className={styles.listBox} ref={tableBoxRef}>
          {openKonva && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <TableDraw
                stageSize={stageSize}
                tableList={clientTableList}
                setClientTableList={setClientTableList}
              />
            </motion.div>
          )}
        </div>
      );
    }
    case 'order': {
      const swiper_motion = {
        active: {
          y: 0,
          opacity: 1,
        },
        notActive: {
          y: -10,
          opacity: 0,
        },
      };

      return (
        <>
          {selectedCategory.id === 1 ? (
            <>
              {allOrderList.data && !allOrderList.isFetching ? (
                <OrderListSwiper
                  orderList={allOrderList.data.filter((list) => !list.isDone)}
                  swiper_motion={swiper_motion}
                />
              ) : (
                <Loader />
              )}
            </>
          ) : (
            <>
              {allOrderList.data && !allOrderList.isFetching ? (
                <CompletedOrderListSwiper
                  orderList={allOrderList.data.filter((list) => list.isDone)}
                  swiper_motion={swiper_motion}
                />
              ) : (
                <Loader />
              )}
            </>
          )}
          <ConfirmModal />
        </>
      );
    }
  }
}
