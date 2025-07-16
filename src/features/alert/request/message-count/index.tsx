import { motion, AnimatePresence } from 'motion/react';

import styles from './../index.module.css';

export default function MessageCountPannel({ count }: { count: number }) {
  return (
    <ul className={`${styles.reqeustMsg} ${styles.hidden}`}>
      <AnimatePresence mode='popLayout'>
        {Array(count)
          .fill(0)
          .map((_, idx) => {
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
