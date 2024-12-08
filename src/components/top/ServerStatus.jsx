import styles from '@/style/top/ServerStatus.module.css';

import { motion } from 'motion/react';

export default function ServerStatus() {
  return (
    <motion.div
      className={styles.serverStatus}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className={styles.textBox}>접속 상태</div>
      <div className={styles.status}></div>
    </motion.div>
  );
}
