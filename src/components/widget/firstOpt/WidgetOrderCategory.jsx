import styles from '@/style/widget/WidgetCategoryList.module.css';
import { option, optionList } from '../../../lib/motion/motion_widgetOption';
import { useBoundStore } from '../../../lib/store/useBoundStore';

import { motion, AnimatePresence } from 'motion/react';

export default function WidgetOrderCategory() {
  const firstOption = useBoundStore((state) => state.widget.openOptionList[1]);

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
