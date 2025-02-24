import styles from '@/style/AlertMsg.module.css';
import { RequestList } from '../../types/common';

import { motion, AnimatePresence } from 'motion/react';

export default function HiddenAlertMessage({ extraMsg }: { extraMsg: RequestList[] }) {
  const hasExtraMsg = extraMsg.length > 0;
  const limitExtraMsg = hasExtraMsg ? extraMsg.slice(4) : extraMsg;
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
