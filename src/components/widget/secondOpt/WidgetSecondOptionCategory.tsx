import styles from '@/style/widget/WidgetCategoryList.module.css';
import { option, optionList } from '../../../lib/motion/motion_widgetOption';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import RequestMsgToggle from './RequestMsgToggle';

import { motion, AnimatePresence } from 'motion/react';

export default function WidgetSecondOptionCategory() {
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
          variants={optionList}
          initial={'notClicked'}
          animate={'clicked'}
          exit={'notClicked'}
          onClick={onClickAlertEditor}
        >
          <motion.li className={`${styles.option} ${styles.toggleBox}`} variants={option}>
            <RequestMsgToggle />
          </motion.li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
