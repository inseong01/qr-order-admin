import { motion, AnimatePresence } from 'motion/react';

import { useBoundStore } from '../../../../lib/store/use-bound-store';
import { ModalType } from '../../../../lib/store/slices/modal-slice';

import styles from './../category-option.module.css';

import { optionMotion, optionListMotion } from '../../motion/variants';

export default function FirstMenuCategory() {
  // store
  const firstOption = useBoundStore((state) => state.widget.openOptionList[1]);
  const submitError = useBoundStore((state) => state.submit.isError);
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const resetItemState = useBoundStore((state) => state.resetItemState);

  function onClickOpenEditor(modalType: ModalType) {
    return () => {
      // 바로 닫히기 때문에 처리 중 반환하여 연속 제출 제한
      if (isSubmit) return;
      if (submitError) return;
      // 위젯 아이템 초기화
      resetItemState();
      changeModalState({ type: modalType, isOpen: true });
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
          <motion.li className={styles.option} variants={optionMotion} onClick={onClickOpenEditor('update-category')}>
            <span className={styles.textBox}>분류</span>
          </motion.li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
