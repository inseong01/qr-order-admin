'use client';

import styles from '@/style/MainPageList.module.css';
import MiddleBox from './MiddleBox';
// import TableDraw from './TableDraw';
import { changeModalState } from '@/lib/features/modalState/modalSlice';
import { resetSubmitState } from '@/lib/features/submitState/submitSlice';
import { getItemInfo, resetItemState } from '@/lib/features/itemState/itemSlice';
import getMenuList from '@/lib/supabase/func/getMenuList';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import OrderListSwiper from './swiper/OrderListSwiper';
import CompletedOrderListSwiper from './swiper/CompletedOrderListSwiper';
import getAllOrderList from '@/lib/supabase/func/getAllOrderList';
import Loader from './Loader';

// konva ssr 방지
// const KonvaCanvas = dynamic(() => import('./TableDraw'), {
//   ssr: false,
// });

// customer
// 고객이 서버로 속성 항목에 맞춰 보냄
// 고객 주문 목록 속성 항목: id, name, price, sort, amount
const customerOrderList = [
  { id: 1, name: '음식 0', price: 1000, sort: '', amount: 1 },
  { id: 2, name: '음식 1', price: 1000, sort: '', amount: 1 },
  { id: 3, name: '음식 2', price: 1000, sort: '', amount: 1 },
  { id: 4, name: '음식 3', price: 1000, sort: '', amount: 1 },
  { id: 5, name: '음식 4', price: 1000, sort: '', amount: 1 },
  { id: 6, name: '음식 5', price: 1000, sort: '', amount: 1 },
  { id: 7, name: '음식 6', price: 1000, sort: '', amount: 1 },
  { id: 8, name: '음식 7', price: 1000, sort: '', amount: 1 },
  { id: 9, name: '음식 8', price: 1000, sort: '', amount: 1 },
]; // id = 음식 식별자 번호

// admin
// 주문 항목이 있다면 실시간으로 가져옴
// 모든 주문 목록 속성 항목: id, title, totalPrice, customerOrderList
const allOrderList = [
  { id: 0, totalPrice: '10,000', customerOrderList, isDone: false },
  { id: 1, totalPrice: '10,000', customerOrderList, isDone: false },
  { id: 2, totalPrice: '10,000', customerOrderList, isDone: false },
  { id: 3, totalPrice: '10,000', customerOrderList, isDone: false },
  { id: 4, totalPrice: '10,000', customerOrderList, isDone: false },
  { id: 5, totalPrice: '10,000', customerOrderList, isDone: false },
  { id: 6, totalPrice: '10,000', customerOrderList, isDone: false },
  { id: 7, totalPrice: '10,000', customerOrderList, isDone: false },
  { id: 8, totalPrice: '10,000', customerOrderList, isDone: false },
  { id: 9, totalPrice: '10,000', customerOrderList, isDone: false },
]; // id = 주문 고유 식별자

export default function MainPageList() {
  // useSelector
  const type = useSelector((state) => state.tabState.state);
  const selectedCategory = useSelector((state) => state.categoryState);
  // useDispatch
  const dispatch = useDispatch();
  // useQuery
  const menuList = useQuery({
    queryKey: ['menuList', type, selectedCategory],
    queryFn: () => getMenuList(type, selectedCategory),
  });
  const allOrderList = useQuery({
    queryKey: ['allOrderList', type, selectedCategory],
    queryFn: () => getAllOrderList(type, selectedCategory),
  });

  function onClickOpenModal(type, list) {
    return () => {
      dispatch(resetSubmitState());
      dispatch(changeModalState({ isOpen: true, type }));
      if (type !== 'edit') {
        dispatch(resetItemState());
        return;
      }
      dispatch(getItemInfo({ item: list }));
    };
  }

  switch (type) {
    case 'menu': {
      return (
        <ul className={styles.listBox}>
          {!menuList.isLoading ? (
            <>
              {menuList.data.map((list, idx) => {
                return (
                  <motion.li key={idx} className={styles.list} onClick={onClickOpenModal('edit', list)}>
                    <div className={styles.topBox}>
                      <div className={styles.top}>
                        <div className={styles.title}>{list.name}</div>
                      </div>
                    </div>
                    <div className={styles.bottomBox}>
                      <div className={styles.bottom}>
                        <div className={styles.price}>{list.price}원</div>
                      </div>
                    </div>
                  </motion.li>
                );
              })}

              <li className={`${styles.list} ${styles.addBtn}`} onClick={onClickOpenModal('add')}>
                <Image src={'/img/add-icon.png'} alt="상품 추가" width={30} height={30} />
                <div className="title">상품 추가</div>
              </li>
            </>
          ) : (
            <Loader />
          )}
        </ul>
      );
    }
    case 'table': {
      return <div className={styles.listBox}>{/* <KonvaCanvas /> */}</div>;
    }
    case 'order': {
      if (selectedCategory.key === 1) {
        return allOrderList.data && <OrderListSwiper allOrderList={allOrderList.data} />;
      } else if (selectedCategory.key === 2) {
        return allOrderList.data && <CompletedOrderListSwiper allOrderList={allOrderList.data} />;
      }
    }
  }
}
