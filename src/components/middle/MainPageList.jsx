import { changeSubmitState } from '@/lib/features/submitState/submitSlice';
import fetchTableList from '../../lib/supabase/func/fetchTableList';
import MainPageOrderTab from './MainPageOrderTab';
import MainPageMenuTab from './MainPageMenuTab';
import MainPageTableTab from './MainPageTableTab';

import { useDispatch, useSelector } from 'react-redux';
import { useQueries } from '@tanstack/react-query';
import { useEffect } from 'react';
import fetchOrderList from '../../lib/supabase/func/fetchOrderList';

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
  const trigger = useSelector((state) => state.realtimeState.allOrderList.trigger);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  // useQueries
  const [allOrderList, tableList] = useQueries({
    queries: [
      {
        queryKey: ['allOrderList', trigger],
        queryFn: () => fetchOrderList('select'),
        initialData: [],
      },
      {
        queryKey: ['tableList', isSubmit],
        queryFn: () => fetchTableList('select'),
        enabled: tab === 'table',
      },
    ],
  });
  // useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // 주문 탭이고 제출했을 때 동작
    if (tab !== 'order' && !isSubmit) return;
    dispatch(changeSubmitState({ isSubmit: false }));
  }, [tab, allOrderList]);

  switch (tab) {
    case 'menu': {
      return <MainPageMenuTab />;
    }
    case 'table': {
      return <MainPageTableTab tableList={tableList} />;
    }
    case 'order': {
      return <MainPageOrderTab allOrderList={allOrderList} />;
    }
  }
}
