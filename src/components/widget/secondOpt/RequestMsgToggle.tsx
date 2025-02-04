import styles from '@/style/widget/WidgetCategoryList.module.css';
import { useBoundStore } from '../../../lib/store/useBoundStore';

import { motion, AnimatePresence } from 'motion/react';

export default function RequestMsgToggle() {
  const tableRequestAlertOn = useBoundStore((state) => state.alert.isOn);

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
