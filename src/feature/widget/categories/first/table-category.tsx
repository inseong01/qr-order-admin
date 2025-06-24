import { motion, AnimatePresence } from 'motion/react';

import { useBoundStore } from '../../../../lib/store/use-bound-store';
import { KonvaEditType } from '../../../../lib/store/slices/konva-slice';

import styles from './../category-option.module.css';

import { optionMotion, optionListMotion } from '../../motion/variants';

export default function FirstTableCategory() {
  const firstOption = useBoundStore((state) => state.widget.openOptionList[1]);
  const editTableType = useBoundStore((state) => state.konva.type);
  const editTableisEditing = useBoundStore((state) => state.konva.isEditing);
  const submitError = useBoundStore((state) => state.submit.isError);
  const changeKonvaEditState = useBoundStore((state) => state.changeKonvaEditState);

  function onClickEnableEditTable(editType: KonvaEditType) {
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
          variants={optionListMotion}
          initial={'notClicked'}
          animate={'clicked'}
          exit={'notClicked'}
        >
          {/* 테이블 생성 */}
          <motion.li
            className={`${styles.option} ${firstOption && editTableType === 'insert' ? styles.currentOpt : ''}`}
            variants={optionMotion}
            onClick={onClickEnableEditTable('insert')}
          >
            <span className={styles.iconBox}>
              <span className={styles.textBox}>생성</span>
            </span>
          </motion.li>

          {/* 테이블 수정 */}
          <motion.li
            className={`${styles.option} ${firstOption && editTableType === 'update' ? styles.currentOpt : ''}`}
            variants={optionMotion}
            onClick={onClickEnableEditTable('update')}
          >
            <span className={styles.iconBox}>
              <span className={styles.textBox}>수정</span>
            </span>
          </motion.li>

          {/* 테이블 삭제 */}
          <motion.li
            className={`${styles.option} ${firstOption && editTableType === 'delete' ? styles.currentOpt : ''}`}
            variants={optionMotion}
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
