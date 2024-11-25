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

export default function HeaderLeft() {
  const [clicked, setClicked] = useState(0);

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
        <Image src={'/img/add-icon.png'} alt="메뉴 추가하기" width={15} height={15} />
        <div className={styles.title}>추가</div>
      </li>
    </ul>
  );
}
