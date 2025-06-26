import { motion, AnimatePresence } from 'motion/react';

import { useBoundStore } from '../../../../lib/store/use-bound-store';

import styles from './toggle.module.css';

export default function RequestMsgToggle() {
  const tableRequestAlertOn = useBoundStore((state) => state.alert.isOn);

  return (
    <div className={styles.toggle}>
      <div>알림</div>

      <AnimatePresence mode='wait' initial={false}>
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
