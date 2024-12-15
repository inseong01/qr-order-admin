import styles from '@/style/WidgetCategoryList.module.css';

import { motion, AnimatePresence } from 'motion/react';
import { useSelector } from 'react-redux';

export default function RequestMsgToggle() {
  // useSelector
  const tableRequestAlertOn = useSelector((state) => state.realtimeState.tableRequestList.isOn);

  return (
    <div className={`${styles.toggle}`}>
      <div>알림</div>
      <AnimatePresence mode="wait" initial={false}>
        {!tableRequestAlertOn ? (
          <motion.div
            className={styles.circle}
            key={'toggleOn'}
            initial={{ y: -15 }}
            animate={{ y: 0 }}
            exit={{ y: -15 }}
          >
            표시
          </motion.div>
        ) : (
          <motion.div
            className={styles.circle}
            key={'toggleOff'}
            initial={{ y: 15 }}
            animate={{ y: 0 }}
            exit={{ y: 15 }}
          >
            끄기
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
