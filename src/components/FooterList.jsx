'use client';

import styles from '@/style/FooterList.module.css';

import { motion } from 'motion/react';
import { useState } from 'react';

const footerListArr = [{ title: '메뉴' }, { title: '좌석' }, { title: '주문내역' }];

export default function FooterList() {
  const [clicked, setClicked] = useState(0);
  return (
    <>
      {footerListArr.map((list, idx) => {
        return (
          <div
            key={idx}
            className={`${styles.listBox} ${clicked === idx ? styles.clicked : ''}`}
            onClick={() => {
              setClicked((prev) => (prev = idx));
            }}
          >
            <div className={styles.title}>{list.title}</div>
            {clicked === idx && <motion.div className={styles.line} layoutId="footerLine"></motion.div>}
          </div>
        );
      })}
    </>
  );
}
