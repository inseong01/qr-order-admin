'use client';

import styles from '@/style/AlertMsg.module.css';

import { motion } from 'motion/react';

export default function AlertMsg() {
  const type = 'edit';
  let str = '';

  switch (type) {
    case 'edit': {
      str = '수정되었습니다.';
      break;
    }
    case 'add': {
      str = '추가되었습니다.';
      break;
    }
  }

  return (
    <motion.div
      className={styles.alertMsg}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ translateX: '-50%' }}
    >
      <div className={styles.title}>{str}</div>
    </motion.div>
  );
}
