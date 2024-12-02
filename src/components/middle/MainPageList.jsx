'use client';

import styles from '@/style/middle/MainPageList.module.css';
import OrderListSwiper from '../swiper/OrderListSwiper';
import CompletedOrderListSwiper from '../swiper/CompletedOrderListSwiper';
import getAllOrderList from '@/lib/supabase/func/getAllOrderList';
import Loader from '../Loader';
import MenuList from './MenuList';
// import TableDraw from './TableDraw';

import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { changeSubmitState } from '@/lib/features/submitState/submitSlice';

// konva ssr 방지
// const KonvaCanvas = dynamic(() => import('./TableDraw'), {
//   ssr: false,
// });

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
  // useQuery
  const [notCompletedOrderList, completedOrderList] = useQueries({
    queries: [
      {
        // 배열 업데이트 적용하기
        queryKey: ['allOrderList', 'false', selectedCategory, isSubmit],
        queryFn: () => getAllOrderList('order', false),
        enabled: tab === 'order' && selectedCategory.key === 1,
        select: (data) => {
          return data.sort((a, b) => a.orderNum - b.orderNum);
        },
      },
      {
        // 배열 업데이트 적용하기
        queryKey: ['allOrderList', 'true', selectedCategory],
        queryFn: () => getAllOrderList('order', true),
        enabled: tab === 'order' && selectedCategory.key === 2,
        select: (data) => {
          return data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        },
      },
    ],
  });
  // useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // 주문 탭이고 제출했을 때 동작
    if (tab !== 'order' || !isSubmit) return;
    dispatch(changeSubmitState({ isSubmit: false }));
  }, [tab, notCompletedOrderList]);

  // motion
  const ul_motion = {
    load: {},
    notLoad: {},
  };

  switch (type) {
    case 'menu': {
      return (
        <motion.ul className={styles.listBox} variants={ul_motion} initial={'notLoad'} animate={'load'}>
          <MenuList />
        </motion.ul>
      );
    }
    case 'table': {
      return <div className={styles.listBox}>{/* <KonvaCanvas /> */}</div>;
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
          {selectedCategory.key === 1 ? (
            <>
              {notCompletedOrderList.data && !notCompletedOrderList.isFetching ? (
                <OrderListSwiper orderList={notCompletedOrderList.data} swiper_motion={swiper_motion} />
              ) : (
                <Loader />
              )}
            </>
          ) : (
            <>
              {completedOrderList.data && !completedOrderList.isFetching ? (
                <CompletedOrderListSwiper orderList={completedOrderList.data} swiper_motion={swiper_motion} />
              ) : (
                <Loader />
              )}
            </>
          )}
        </>
      );
    }
  }
}
