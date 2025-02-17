import styles from '@/style/widget/WidgetCategoryList.module.css';
import { EditType } from '../../../lib/store/useKonvaSlice';
import { option, optionList } from '../../../lib/motion/motion_widgetOption';
import { useBoundStore } from '../../../lib/store/useBoundStore';

import { motion, AnimatePresence } from 'motion/react';

export default function WidgetTableCategory() {
  const firstOption = useBoundStore((state) => state.widget.openOptionList[1]);
  const editTableType = useBoundStore((state) => state.konva.type);
  const editTableisEditing = useBoundStore((state) => state.konva.isEditing);
  const submitError = useBoundStore((state) => state.submit.isError);
  const changeKonvaEditState = useBoundStore((state) => state.changeKonvaEditState);

  function onClickEnableEditTable(editType: EditType) {
    return () => {
      if (submitError) return;
      if (editTableType !== editType && editTableisEditing) {
        // 편집 중에 다른 editType으로 변환 제한
        return alert('편집 중에 변경할 수 없습니다.');
      }
      changeKonvaEditState({ editType });
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
              firstOption && editTableType === 'insert' ? styles.currentOpt : ''
            }`}
            variants={option}
            onClick={onClickEnableEditTable('insert')}
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
