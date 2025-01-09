import styles from '@/style/AlertMsg.module.css';
import { motion, AnimatePresence } from 'motion/react';

export default function DisplayedAlertMessage({ requestAlertList, onClickReadMsg }) {
  return (
    <motion.ul className={`${styles.reqeustMsg}`}>
      <AnimatePresence mode="popLayout">
        {requestAlertList.map((list) => {
          const { id, tableNum, requestList } = list;
          return (
            <motion.li
              key={id}
              className={styles.msg}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              layout
            >
              <div className={styles.top}>
                <div className={styles.title}>테이블 {tableNum}</div>
                <div className={styles.closeBtn} onClick={onClickReadMsg(list)}>
                  <img src="/img/close-icon.webp" alt="닫기" />
                </div>
              </div>
              <div className={styles.bottom}>
                <div>
                  <span className={styles.cate}>요청</span>
                </div>
                <span>{requestList}</span>
              </div>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </motion.ul>
  );
}
