import styles from '@/style/Widget.module.css';
import { menu } from '../../../lib/motion/motion_widgetMenu';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import WidgetFirstOptionCategories from './WidgetFirstOptionCategories';

import { motion, AnimatePresence } from 'motion/react';
import { useSelector } from 'react-redux';

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
  // useSelector
  const editTableType = useSelector((state) => state.konvaState.type);
  const tableIdArr = useSelector((state) => state.konvaState.target.id);
  const tableListData = useSelector((state) => state.itemState.clientTableList);
  // variant
  const dataArr = editTableType !== 'delete' ? tableListData : tableIdArr;

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
