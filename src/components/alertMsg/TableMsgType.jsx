import styles from '@/style/AlertMsg.module.css';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function TableMsgType({ requestAlertList }) {
  // useRef
  const reqeustMsgRef = useRef(null);

  return (
    <div className={styles.reqeustMsgWrap} ref={reqeustMsgRef}>
      <motion.ul className={styles.reqeustMsg}>
        <AnimatePresence mode="popLayout">
          {requestAlertList.map((list, idx) => {
            return (
              <motion.li
                key={idx}
                className={styles.msg}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ y: 10 }}
                layout
              >
                <div className={styles.top}>
                  <div className={styles.index}>#{idx + 1}</div>
                  <div className={styles.title}> 테이블 1</div>
                </div>
                <div className={styles.bottom}>
                  <span>요청사항: </span>
                  <br />
                  <span>qqqqqqqqqqqqqqqqqqqqq</span>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
