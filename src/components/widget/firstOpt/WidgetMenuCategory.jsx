import styles from '@/style/WidgetCategoryList.module.css';
import { option, optionList } from '../../../lib/motion/motion_widgetOption';
import { useBoundStore } from '../../../lib/store/useBoundStore';

import { motion, AnimatePresence } from 'motion/react';

export default function WidgetMenuFirstCategory() {
  // store
  const firstOption = useBoundStore((state) => state.widget.openOptionList[1]);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const resetSubmitState = useBoundStore((state) => state.resetSubmitState);

  function onClickOpenEditor(modalType) {
    return () => {
      resetSubmitState();
      changeModalState({ type: modalType, isOpen: true });
    };
  }

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
          <motion.li
            className={styles.option}
            variants={option}
            onClick={onClickOpenEditor('update-category')}
          >
            <span className={styles.textBox}>분류</span>
          </motion.li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
