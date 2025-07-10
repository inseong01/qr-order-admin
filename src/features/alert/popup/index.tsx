import { useAtom } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';

import { submissionStatusAlertAtom } from './store/atom';
import styles from './index.module.css';

const SubmissionStatusAlert = () => {
  const [alertState, setAlertState] = useAtom(submissionStatusAlertAtom);

  const handleClose = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AnimatePresence>
      {alertState.isOpen && (
        <>
          {/* 알림 */}
          <motion.div
            className={styles.dialog}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            {alertState.title}
          </motion.div>

          {/* 배경 */}
          <motion.div
            className={styles.backdrop}
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SubmissionStatusAlert;
