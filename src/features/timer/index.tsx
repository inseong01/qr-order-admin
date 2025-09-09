import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { motion } from 'motion/react';

import { getLocaleString } from './util/get-locale-string';

import { dateStateAtom, setDateStateAtom, setTimeStateAtom, timeStateAtom } from './store/atom';
import styles from './index.module.css';

export default function Timer() {
  const date = useAtomValue(dateStateAtom);
  const time = useAtomValue(timeStateAtom);
  const setDateState = useSetAtom(setDateStateAtom);
  const setTimeState = useSetAtom(setTimeStateAtom);

  useEffect(() => {
    const tick = () => {
      const { newTime, newDate } = getLocaleString();
      setTimeState(newTime.slice(0, -3));
      setDateState(newDate);

      setTimeout(tick, 1000);
    };

    tick();
  }, []);

  return (
    <li className={styles.now}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {date} {time}
      </motion.div>
    </li>
  );
}
