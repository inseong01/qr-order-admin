import styles from '@/style/AlertMsg.module.css';

import { motion, AnimatePresence } from 'motion/react';

export default function HiddenAlertMessage({ extraMsg }) {
  const hasExtraMsg = extraMsg.length > 0;
  const limitExtraMsg = hasExtraMsg ? extraMsg.slice(0, 4) : extraMsg;
  return (
    hasExtraMsg && (
      <ul className={`${styles.reqeustMsg} ${styles.hidden}`}>
        <AnimatePresence mode="popLayout">
          {limitExtraMsg.map((_, idx) => {
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
    )
  );
}
