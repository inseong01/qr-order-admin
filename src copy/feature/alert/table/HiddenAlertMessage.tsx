import { motion, AnimatePresence } from 'motion/react';

import { RequestList } from '../../../types/common';

import styles from './alert-index.module.css';

export default function HiddenAlertMessage({ list }: { list: RequestList[] }) {
  return (
    <ul className={`${styles.reqeustMsg} ${styles.hidden}`}>
      <AnimatePresence mode='popLayout'>
        {list.map((_, idx) => {
          return (
            <motion.li
              key={idx}
              className={styles.msg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              layout
            >
              <div className={styles.top}></div>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
}
