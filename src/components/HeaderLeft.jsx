'use client';

import styles from '@/style/HeaderLeft.module.css';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const menuCategotyList = [
  {
    title: '메인메뉴',
  },
  {
    title: '사이드',
  },
];

const orderCategotyList = [
  {
    title: '접수',
    listAmount: 5,
  },
  {
    title: '완료',
  },
];

const tableCategotyList = [
  {
    title: '기본 구역',
  },
  {
    title: '구역 1',
  },
];

export default function HeaderLeft() {
  // useState
  const [clicked, setClicked] = useState(0);
  // useSelector
  const type = useSelector((state) => state.tabState.state);
  // useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    setClicked(0);
  }, [type]);

  function onClickChangeTabCategory(idx) {
    return () => {
      setClicked((prev) => (prev = idx));
    };
  }

  switch (type) {
    case 'menu': {
      return (
        <ul className={styles.left}>
          {menuCategotyList.map((list, idx) => {
            return (
              <li key={idx} className={styles.categoryBox}>
                <div
                  key={idx}
                  className={`${clicked === idx ? styles.clicked : ''} ${styles.category}`}
                  onClick={onClickChangeTabCategory(idx)}
                >
                  <div className={styles.title}>{list.title}</div>
                </div>
                {clicked === idx && <motion.div className={styles.line} layoutId="headerline"></motion.div>}
              </li>
            );
          })}
          <li className={styles.addCategoryBox}>
            <div className={styles.category}>
              <Image src={'/img/add-icon.png'} alt="메뉴 추가" width={15} height={15} />
              <div className={styles.title}>분류</div>
            </div>
          </li>
        </ul>
      );
    }
    case 'table': {
      return (
        <ul className={styles.left}>
          {tableCategotyList.map((list, idx) => {
            return (
              <li key={idx} className={styles.categoryBox}>
                <div
                  key={idx}
                  className={`${clicked === idx ? styles.clicked : ''} ${styles.category}`}
                  onClick={onClickChangeTabCategory(idx)}
                >
                  <div className={styles.title}>{list.title}</div>
                </div>
                {clicked === idx && <motion.div className={styles.line} layoutId="headerline"></motion.div>}
              </li>
            );
          })}
          <li className={styles.addCategoryBox}>
            <div className={`${styles.category}`}>
              <Image src={'/img/add-icon.png'} alt="구역 추가" width={15} height={15} />
              <div className={styles.title}>구역</div>
            </div>
          </li>
        </ul>
      );
    }
    case 'order': {
      return (
        <ul className={styles.left}>
          {orderCategotyList.map((list, idx) => {
            return (
              <li key={idx} className={styles.categoryBox}>
                <div
                  key={idx}
                  className={`${clicked === idx ? styles.clicked : ''} ${styles.category}`}
                  onClick={onClickChangeTabCategory(idx)}
                >
                  <div className={styles.title}>
                    {list.title} {list.title === '접수' ? list.listAmount : ''}
                  </div>
                </div>
                {clicked === idx && <motion.div className={styles.line} layoutId="headerline"></motion.div>}
              </li>
            );
          })}
        </ul>
      );
    }
  }
}
