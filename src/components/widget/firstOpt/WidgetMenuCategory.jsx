import styles from '@/style/WidgetCategoryList.module.css';
import { resetSubmitState } from '../../../lib/features/submitState/submitSlice';
import { changeModalState } from '@/lib/features/modalState/modalSlice';
import { option, optionList } from '../../../lib/motion/motion_widgetOption';

import { motion, AnimatePresence } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

export default function WidgetMenuFirstCategory() {
  // useSelector
  const firstOption = useSelector((state) => state.widgetState.isWidgetListOpen.firstOption);
  // useDispatch
  const dispatch = useDispatch();

  function onClickOpenEditor(modalType) {
    return () => {
      dispatch(resetSubmitState());
      dispatch(changeModalState({ type: modalType, isOpen: true }));
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
            onClick={onClickOpenEditor('delete-category')}
          >
            <span className={styles.textBox}>분류</span>
          </motion.li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
