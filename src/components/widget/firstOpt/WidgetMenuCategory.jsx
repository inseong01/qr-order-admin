import styles from '@/style/WidgetCategoryList.module.css';
import { resetSubmitState } from '../../../lib/features/submitState/submitSlice';
import { changeModalState } from '../../../lib/features/modalState/modalSlice';
import { option, optionList } from '../../../lib/motion/motion_widgetOption';
import { useBoundStore } from '../../../lib/store/useBoundStore';

import { motion, AnimatePresence } from 'motion/react';
import { useDispatch } from 'react-redux';

export default function WidgetMenuFirstCategory() {
  // useDispatch
  const dispatch = useDispatch();
  // hook
  const firstOption = useBoundStore((state) => state.widget.openOptionList[1]);

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
            onClick={onClickOpenEditor('update-category')}
          >
            <span className={styles.textBox}>분류</span>
          </motion.li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
