import styles from '@/style/swiper/OrderListSwiper.module.css';
import MiddleBox from '../middle/MiddleBox';
import { changeModalState } from '@/lib/features/modalState/modalSlice';
import { getOrderListInfo, getSelectedListId } from '../../lib/features/itemState/itemSlice';
import { changeSubmitMsgType } from '../../lib/features/submitState/submitSlice';
import { swiper_motion } from '../../lib/motion/motion_mainPageOrderTab';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Pagination, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import { useDispatch, useSelector } from 'react-redux';

function OrderListSlide({ list, idx }) {
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const selectedListId = useSelector((state) => state.itemState.selectedListId);
  const preventSubmit = useSelector((state) => state.submitState.isError);
  // variant
  const amount = list.orderList.reduce((prev, curr) => prev + curr.amount, 0);

  function onClickOpenListOption(list) {
    return () => {
      dispatch(getSelectedListId({ selectedListId: list.id }));
    };
  }

  function onClickCloseListOption(e) {
    e.stopPropagation();
    dispatch(getSelectedListId({ selectedListId: '' }));
  }

  function onClickUpdateListState(list) {
    return () => {
      if (preventSubmit) return;
      const method = selectedListId === list.id ? 'delete' : 'update';
      dispatch(changeSubmitMsgType({ msgType: method, status: 'initial' }));
      dispatch(changeModalState({ isOpen: true, type: 'update' }));
      dispatch(getOrderListInfo({ list }));
    };
  }

  return (
    <li className={`swiper-slide ${styles.slide}`}>
      <div className={styles.list}>
        <div className={styles.topBox} onClick={onClickOpenListOption(list)}>
          <div className={styles.top}>
            <div className={styles.title}>#{idx + 1}</div>
            <div className={styles.right}>
              <div className={styles.table}>테이블 {list.tableNum}</div>
            </div>
          </div>
        </div>
        <MiddleBox orderList={list.orderList} />
        <div className={styles.bottomBox}>
          <div className={styles.bottom}>
            <div className={styles.totalMenuAmount}>
              <span>{amount}</span> 개
            </div>
            <div
              className={`${styles.completeBtn} ${selectedListId === list.id ? styles.delete : ''}`}
              onClick={onClickUpdateListState(list)}
            >
              {selectedListId === list.id ? '삭제' : '완료'}
            </div>
          </div>
        </div>
        <AnimatePresence>
          {selectedListId === list.id && (
            <motion.ul
              className={styles.listOptionBox}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              style={{ y: 10 }}
            >
              <li className={styles.option} onClick={onClickCloseListOption}>
                <img src={'/img/close-icon.png'} alt="옵션 닫기" style={{ width: 30, height: 30 }} />
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

export default function OrderListSwiper({ orderList }) {
  // useRef
  const orderListRef = useRef(null);

  useEffect(() => {
    if (!orderListRef.current) return;
    new Swiper(orderListRef.current, {
      modules: [Pagination, Grid],
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
        clickable: true,
      },
      grid: {
        fill: 'row',
        rows: 2,
      },
      slidesPerView: 1,
      spaceBetween: 20,
      breakpoints: {
        600: {
          slidesPerView: 2,
        },
        900: {
          slidesPerView: 3,
        },
        1100: {
          slidesPerView: 4,
        },
        1400: {
          slidesPerView: 5,
        },
        1700: {
          slidesPerView: 6,
        },
      },
    });
  }, []);

  return (
    <>
      <motion.div
        className={`orderList ${styles.orderList}`}
        ref={orderListRef}
        variants={swiper_motion}
        initial={'notActive'}
        animate={'active'}
      >
        <ul className={`swiper-wrapper ${styles.listBox}`}>
          {orderList.map((list, idx) => {
            return <OrderListSlide key={idx} list={list} idx={idx} />;
          })}
        </ul>
        <div className={`swiper-pagination ${styles.pagination}`}></div>
      </motion.div>
    </>
  );
}
