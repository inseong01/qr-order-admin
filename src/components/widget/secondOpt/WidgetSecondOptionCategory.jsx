import styles from '@/style/WidgetCategoryList.module.css';
import { setTableRequestListAlertOn } from '../../../lib/features/realtimeState/realtimeSlice';
import { option, optionList } from '../../../lib/motion/motion_widgetOption';
import RequestMsgToggle from './RequestMsgToggle';

import { motion, AnimatePresence } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

export default function WidgetSecondOptionCategory() {
  // useSelector
  const secondOption = useSelector((state) => state.widgetState.isWidgetListOpen.secondOption);
  // useDispatch
  const dispatch = useDispatch();

  function onClickAlertEditor() {
    dispatch(setTableRequestListAlertOn());
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
