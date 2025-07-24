import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { motion } from 'motion/react';

import { connectStateAtom, dateStateAtom, setDateStateAtom, setTimeStateAtom, timeStateAtom } from './store/atom';
import styles from './index.module.css';

export default function Timer() {
  const date = useAtomValue(dateStateAtom);
  const time = useAtomValue(timeStateAtom);
  const connectState = useAtomValue(connectStateAtom);
  const setDateState = useSetAtom(setDateStateAtom);
  const setTimeState = useSetAtom(setTimeStateAtom);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const newTime = now.toLocaleTimeString();
      const newDate = now.toLocaleDateString();
      setTimeState(newTime.slice(0, -3));
      setDateState(newDate);
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
          <span className={styles.icon} data-connected={connectState}></span>
        </span>
      </li>
    </ul>
  );
}
