import styles from '@/style/WidgetCategoryList.module.css';
import { option, optionList } from '../../../lib/motion/motion_widgetOption';

import { motion, AnimatePresence } from 'motion/react';
import { useSelector } from 'react-redux';

export default function WidgetOrderCategory() {
  const firstOption = useSelector((state) => state.widgetState.isWidgetListOpen.firstOption);

  return (
    <AnimatePresence>
      {firstOption && (
        <motion.ul
          key={'optionList'}
          className={styles.editorOption}
          variants={optionList}
          initial={'notClicked'}
          animate={'clicked'}
          exit={'notClicked'}
        >
          <motion.li className={styles.option} variants={option}>
            <span className={styles.textBox}>준비중</span>
          </motion.li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
