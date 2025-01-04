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

function ListSlideSubmitBtn({ list }) {
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const selectedListId = useSelector((state) => state.itemState.selectedListId);
  const preventSubmit = useSelector((state) => state.submitState.isError);

  function onClickUpdateListState(list) {
    return () => {
      if (preventSubmit) return;
      const type = selectedListId === list.id ? 'delete' : 'complete';
      dispatch(changeSubmitMsgType({ msgType: type }));
      dispatch(changeModalState({ isOpen: true, type: 'update' }));
      dispatch(getOrderListInfo({ list }));
    };
  }

  return (
    <div
      className={`${styles.completeBtn} ${selectedListId === list.id ? styles.delete : ''}`}
      onClick={onClickUpdateListState(list)}
    >
      {selectedListId === list.id ? '삭제' : '완료'}
    </div>
  );
}

function ListSliceBottom({ list }) {
  // variant
  const amount = list.orderList.reduce((prev, curr) => prev + curr.amount, 0);

  return (
    <div className={styles.bottomBox}>
      <div className={styles.bottom}>
        <div className={styles.totalMenuAmount}>
          <span>{amount}</span> 개
        </div>
        <ListSlideSubmitBtn list={list} />
      </div>
    </div>
  );
}

function ListSlideOption({ list }) {
  // useSelector
  const selectedListId = useSelector((state) => state.itemState.selectedListId);
  // useDispatch
  const dispatch = useDispatch();

  function onClickCloseListOption(e) {
    e.stopPropagation();
    dispatch(getSelectedListId({ selectedListId: '' }));
  }
  return (
    <AnimatePresence>
      {selectedListId === list.id && (
        <motion.ul
          className={styles.listOptionBox}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          style={{ x: '-50%', y: 12, transform: 'translateX(-50%)' }}
        >
          <li className={styles.option} onClick={onClickCloseListOption}>
            <img src={'/img/close-icon.png'} alt="옵션 닫기" style={{ width: 30, height: 30 }} />
          </li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}

function OrderListSlide({ list }) {
  // useDispatch
  const dispatch = useDispatch();

  function onClickOpenListOption(list) {
    return () => {
      dispatch(getSelectedListId({ selectedListId: list.id }));
    };
  }

  return (
    <li className={`swiper-slide ${styles.slide}`}>
      <div className={styles.list}>
        <div className={styles.topBox} onClick={onClickOpenListOption(list)}>
          <div className={styles.top}>
            <div className={styles.title}>#{list.orderNum}</div>
            <div className={styles.right}>
              <div className={styles.table}>테이블 {list.tableNum}</div>
            </div>
          </div>
        </div>
        <MiddleBox orderList={list.orderList} />
        <ListSliceBottom list={list} />
        <ListSlideOption list={list} />
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
            return <OrderListSlide key={idx} list={list} />;
          })}
        </ul>
        <div className={`swiper-pagination ${styles.pagination}`}></div>
      </motion.div>
    </>
  );
}
