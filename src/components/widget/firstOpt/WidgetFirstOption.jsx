import styles from '@/style/Widget.module.css';
import { menu } from '../../../lib/motion/motion_widgetMenu';
import WidgetFirstOptionCategories from './WidgetFirstOptionCategories';

import { motion, AnimatePresence } from 'motion/react';
import { useSelector } from 'react-redux';

export default function WidgetFirstOption({ onClickEditor }) {
  // useSelector
  const isEdited = useSelector((state) => state.widgetState.isEdit);
  const firstOption = useSelector((state) => state.widgetState.isWidgetListOpen.firstOption);

  return (
    <motion.li className={styles.listBox} key={'widgetMenu'} variants={menu}>
      <motion.div className={styles.list} key={'list'} onClick={onClickEditor(1)}>
        <div className={styles.iconBox}>
          <div className={styles.icon}>
            <AnimatePresence mode="wait">
              {!firstOption || !isEdited ? (
                <motion.img
                  src={'/img/edit-icon.png'}
                  alt="편집"
                  style={{ width: 20, height: 20 }}
                  key={'box1'}
                  initial={{ x: 20 }}
                  animate={{ x: 0 }}
                  exit={{ x: -20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              ) : (
                <motion.img
                  src={'/img/checkmark.png'}
                  alt="편집 저장"
                  style={{ width: 20, height: 20 }}
                  key={'box2'}
                  initial={{ x: 20 }}
                  animate={{ x: 0 }}
                  exit={{ x: -20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      <WidgetFirstOptionCategories isClickEditor={firstOption} />
    </motion.li>
  );
}
