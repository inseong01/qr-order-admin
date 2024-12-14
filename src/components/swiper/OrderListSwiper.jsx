import styles from '@/style/swiper/OrderListSwiper.module.css';
import MiddleBox from '../middle/MiddleBox';
import { changeModalState } from '@/lib/features/modalState/modalSlice';
import { getOrderListInfo, getSelectedListId } from '@/lib/features/itemState/itemSlice';
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

export default function OrderListSwiper({ orderList }) {
  // useRef
  const orderListRef = useRef(null);
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const selectedListId = useSelector((state) => state.itemState.selectedListId);
  const preventSubmit = useSelector((state) => state.submitState.isError);

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
      slidesPerView: 4,
      spaceBetween: 10,
    });
  }, []);

  function onClickOpenListOption(list) {
    return () => {
      dispatch(getSelectedListId({ selectedListId: list.id }));
    };
  }

  function onClickCloseListOption(e) {
    e.stopPropagation();
    dispatch(getSelectedListId({ selectedListId: '' }));
  }

  function onClickUpdateListStatus(list) {
    return () => {
      if (preventSubmit) return;
      const method = selectedListId === list.id ? 'delete' : 'update';
      dispatch(changeSubmitMsgType({ msgType: method }));
      dispatch(changeModalState({ isOpen: true, type: 'update' }));
      dispatch(getOrderListInfo({ list }));
    };
  }

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
            const amount = list.orderList.reduce((prev, curr) => prev + curr.amount, 0);
            return (
              <li key={idx} className={`swiper-slide ${styles.slide}`}>
                <div className={styles.list}>
                  <div className={styles.topBox} onClick={onClickOpenListOption(list)}>
                    <div className={styles.top}>
                      <div className={styles.title}>#{list.orderNum}</div>
                      <div className={styles.right}>
                        <div className={styles.table}>{list.tableName}</div>
                        <div className={styles.time}>00:00</div>
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
                        onClick={onClickUpdateListStatus(list)}
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
                          <img
                            src={'/img/close-icon.png'}
                            alt="옵션 닫기"
                            style={{ width: 30, height: 30 }}
                          />
                        </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={`swiper-pagination ${styles.pagination}`}></div>
      </motion.div>
    </>
  );
}
