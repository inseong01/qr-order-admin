import styles from '@/style/WidgetCategoryList.module.css';
import { option, optionList } from '../../../lib/motion/motion_widgetOption';
import { changeKonvaEditState } from '../../../lib/features/konvaState/konvaSlice';
import { changeSubmitMsgType } from '../../../lib/features/submitState/submitSlice';
import { useBoundStore } from '../../../lib/store/useBoundStore';

import { motion, AnimatePresence } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

export default function WidgetTableCategory() {
  // useSelector
  const editTableisEditing = useSelector((state) => state.konvaState.isEditing);
  const editTableType = useSelector((state) => state.konvaState.type);
  // useDispatch
  const dispatch = useDispatch();
  // hook
  const firstOption = useBoundStore((state) => state.widget.openOptionList[1]);

  function onClickEnableEditTable(editType) {
    return () => {
      if (editTableType !== editType && editTableisEditing) {
        // 편집 중에 다른 editType으로 변환 제한
        return alert('편집 중에 변경할 수 없습니다.');
      }
      dispatch(changeSubmitMsgType({ msgType: editType }));
      dispatch(changeKonvaEditState({ editType }));
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
            className={`${styles.option} ${
              firstOption && editTableType === 'create' ? styles.currentOpt : ''
            }`}
            variants={option}
            onClick={onClickEnableEditTable('create')}
          >
            <span className={styles.iconBox}>
              <span className={styles.textBox}>생성</span>
            </span>
          </motion.li>
          <motion.li
            className={`${styles.option} ${
              firstOption && editTableType === 'update' ? styles.currentOpt : ''
            }`}
            variants={option}
            onClick={onClickEnableEditTable('update')}
          >
            <span className={styles.iconBox}>
              <span className={styles.textBox}>수정</span>
            </span>
          </motion.li>
          <motion.li
            className={`${styles.option} ${
              firstOption && editTableType === 'delete' ? styles.currentOpt : ''
            }`}
            variants={option}
            onClick={onClickEnableEditTable('delete')}
          >
            <span className={styles.iconBox}>
              <span className={styles.textBox}>삭제</span>
            </span>
          </motion.li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
