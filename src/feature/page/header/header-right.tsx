import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

import styles from './header-right.module.css';

export default function HeaderRight() {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString().slice(0, -3));

  useEffect(() => {
    setIsFirstRender(false);

    const timer = setInterval(() => {
      const newTime = new Date().toLocaleTimeString();
      const newDate = new Date().toLocaleDateString();

      setTime(newTime.slice(0, -3));
      setDate(newDate);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <ul className={styles.right}>
      {!isFirstRender && (
        <li className={styles.time}>
          {/* 현재 시간 */}
          <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            {date} {time}
          </motion.div>
        </li>
      )}
    </ul>
  );
}
