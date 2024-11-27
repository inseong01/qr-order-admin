'use client';

import { changeTabState } from '@/lib/features/tabState/tabSlice';
import styles from '@/style/FooterList.module.css';

import { motion } from 'motion/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const footerListArr = [
  { key: 'menu', title: '메뉴' },
  { key: 'table', title: '좌석' },
  { key: 'order', title: '주문내역' },
];

export default function FooterList() {
  const isAlert = true;
  // useState
  const [clicked, setClicked] = useState(0);
  // useDispatch
  const dispatch = useDispatch();

  function onClickChangeTab({ key }, idx) {
    return () => {
      dispatch(changeTabState({ state: key }));
      setClicked((prev) => (prev = idx));
    };
  }

  return (
    <>
      {footerListArr.map((list, idx) => {
        return (
          <div
            key={idx}
            className={`${styles.listBox} ${clicked === idx ? styles.clicked : ''}`}
            onClick={onClickChangeTab(list, idx)}
          >
            <div className={styles.title}>
              {list.title}
              {list.title === '좌석' && isAlert && <div className={styles.alertStatus}></div>}
            </div>
            {clicked === idx && <motion.div className={styles.line} layoutId="footerLine"></motion.div>}
          </div>
        );
      })}
    </>
  );
}
