import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

import styles from './index.module.css';

const initDate = new Date();

export default function Timer() {
  const [date, setDate] = useState(initDate.toLocaleDateString());
  const [time, setTime] = useState(initDate.toLocaleTimeString().slice(0, -3));

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const newTime = now.toLocaleTimeString();
      const newDate = now.toLocaleDateString();

      setTime(newTime.slice(0, -3));
      setDate(newDate);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <ul className={styles.timer}>
      {/* 현재 시간 */}
      <li className={styles.now}>
        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          {date} {time}
        </motion.div>
      </li>

      {/* 연결 상태 */}
      <li className={styles.statusBox}>
        <span className={styles.status}>
          <span className={styles.title}>연결 상태</span>
          <span className={styles.icon}></span>
        </span>
      </li>
    </ul>
  );
}
