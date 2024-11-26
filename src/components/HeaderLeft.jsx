'use client';

import styles from '@/style/HeaderLeft.module.css';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useState } from 'react';

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
  const [clicked, setClicked] = useState(0);
  const type = 'table';

  switch (type) {
    case 'menu': {
      return (
        <ul className={styles.left}>
          {menuCategotyList.map((list, idx) => {
            return (
              <li key={idx} className={styles.categoryBox}>
                <div
                  key={idx}
                  className={`${clicked === idx ? styles.clicked : ''}`}
                  onClick={() => setClicked((prev) => (prev = idx))}
                >
                  <div className={styles.title}>{list.title}</div>
                </div>
                {clicked === idx && <motion.div className={styles.line} layoutId="headerline"></motion.div>}
              </li>
            );
          })}
          <li className={styles.addCategoryBox}>
            <Image src={'/img/add-icon.png'} alt="메뉴 추가" width={15} height={15} />
            <div className={styles.title}>분류</div>
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
                  className={`${clicked === idx ? styles.clicked : ''}`}
                  onClick={() => setClicked((prev) => (prev = idx))}
                >
                  <div className={styles.title}>{list.title}</div>
                </div>
                {clicked === idx && <motion.div className={styles.line} layoutId="headerline"></motion.div>}
              </li>
            );
          })}
          <li className={styles.addCategoryBox}>
            <Image src={'/img/add-icon.png'} alt="구역 추가" width={15} height={15} />
            <div className={styles.title}>구역</div>
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
                  className={`${clicked === idx ? styles.clicked : ''}`}
                  onClick={() => setClicked((prev) => (prev = idx))}
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
