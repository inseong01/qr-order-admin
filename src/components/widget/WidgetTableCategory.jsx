import styles from '@/style/WidgetCategoryList.module.css';
import { option, optionList } from '../../lib/motion/motion_widgetOption';
import { changeKonvaEditState } from '../../lib/features/konvaState/konvaSlice';
import { changeSubmitMsgType } from '../../lib/features/submitState/submitSlice';

import { motion, AnimatePresence } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

export default function WidgetTableCategory({ isClickEditor }) {
  // useSelector
  const editTableisEditing = useSelector((state) => state.konvaState.isEditing);
  const editTableType = useSelector((state) => state.konvaState.type);
  // useDispatch
  const dispatch = useDispatch();

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
    <motion.div className={styles.optionListBox}>
      <AnimatePresence>
        {isClickEditor && (
          <motion.ul
            key={'optionList'}
            className={styles.editorOption}
            variants={optionList}
            initial={'notClicked'}
            animate={'clicked'}
            exit={'notClicked'}
          >
            <motion.li
              className={`${styles.option} ${editTableType === 'create' ? styles.currentOpt : ''}`}
              variants={option}
              onClick={onClickEnableEditTable('create')}
            >
              <span className={styles.iconBox}>
                <span className={styles.textBox}>생성</span>
                {/* <img src={'/img/shapes-icon.png'} alt="모형 추가" style={{ width: 20, height: 20 }} /> */}
              </span>
            </motion.li>
            <motion.li
              className={`${styles.option} ${editTableType === 'update' ? styles.currentOpt : ''}`}
              variants={option}
              onClick={onClickEnableEditTable('update')}
            >
              <span className={styles.iconBox}>
                <span className={styles.textBox}>수정</span>
                {/* <img src={'/img/shapes-icon.png'} alt="모형 추가" style={{ width: 20, height: 20 }} /> */}
              </span>
            </motion.li>
            <motion.li
              className={`${styles.option} ${editTableType === 'delete' ? styles.currentOpt : ''}`}
              variants={option}
              onClick={onClickEnableEditTable('delete')}
            >
              <span className={styles.iconBox}>
                <span className={styles.textBox}>삭제</span>
                {/* <img src={'/img/shapes-icon.png'} alt="모형 추가" style={{ width: 20, height: 20 }} /> */}
              </span>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
