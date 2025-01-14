import styles from '@/style/Widget.module.css';
import { menu } from '../../../lib/motion/motion_widgetMenu';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import WidgetFirstOptionCategories from './WidgetFirstOptionCategories';

import { motion, AnimatePresence } from 'motion/react';

function Icon() {
  // hook
  const isEdit = useBoundStore((state) => state.widget.isEdit);
  return (
    <div className={styles.icon}>
      <AnimatePresence mode="wait" initial={false}>
        {!isEdit ? (
          <motion.img
            src={'/img/edit-icon.webp'}
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
            src={'/img/checkmark.webp'}
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
  );
}

export default function WidgetFirstOption({ onClickEditor }) {
  // store
  const tableListData = useBoundStore((state) => state.itemBox.clientTableList);
  const editTableType = useBoundStore((state) => state.konva.type);
  const tableIdArr = useBoundStore((state) => state.konva.target.id);
  // variant
  const dataArr = editTableType === 'delete' ? tableIdArr : tableListData;

  return (
    <motion.li className={styles.listBox} key={'widgetMenu'} variants={menu}>
      <motion.div className={styles.list} key={'list'} onClick={onClickEditor(1, dataArr)}>
        <div className={styles.iconBox}>
          <Icon />
        </div>
      </motion.div>
      <WidgetFirstOptionCategories />
    </motion.li>
  );
}
