import { motion, AnimatePresence } from 'motion/react';

import { useBoundStore } from '../../../../lib/store/use-bound-store';

import styles from './../category-option.module.css';
import { optionMotion, optionListMotion } from '../../motion/variants';

export default function SecondTableCategory() {
  const secondOption = useBoundStore((state) => state.widget.openOptionList[2]);
  const toggleRequestAlert = useBoundStore((state) => state.toggleRequestAlert);

  function onClickAlertEditor() {
    toggleRequestAlert();
  }

  return (
    <AnimatePresence>
      {secondOption && (
        <motion.ul
          key={'optionList'}
          className={styles.editorOption}
          variants={optionListMotion}
          initial={'notClicked'}
          animate={'clicked'}
          exit={'notClicked'}
          onClick={onClickAlertEditor}
        >
          <motion.li className={`${styles.option} ${styles.toggleBox}`} variants={optionMotion}>
            <RequestMsgToggle />
          </motion.li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}

function RequestMsgToggle() {
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
