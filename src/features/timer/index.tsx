import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { motion } from 'motion/react';

import { dateStateAtom, setDateStateAtom, setTimeStateAtom, timeStateAtom } from './store/atom';
import styles from './index.module.css';

export default function Timer() {
  const date = useAtomValue(dateStateAtom);
  const time = useAtomValue(timeStateAtom);
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
    <li className={styles.now}>
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        {date} {time}
      </motion.div>
    </li>
  );
}
