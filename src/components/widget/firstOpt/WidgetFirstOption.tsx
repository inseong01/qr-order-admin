import styles from '@/style/Widget.module.css';
import { OptNum } from '../../../lib/store/useWidgetSlice';
import { DataArr } from '../../../lib/supabase/func/fetchTableList';
import { Method } from '../../../lib/store/useFetchSlice';
import { menu } from '../../../lib/motion/motion_widgetMenu';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import WidgetFirstOptionCategories from './WidgetFirstOptionCategories';

import { motion, AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function IconComponent() {
  const isEdit = useBoundStore((state) => state.widget.isEdit);
  return (
    <AnimatePresence mode="wait" initial={false}>
      {!isEdit ? (
        <motion.div
          className={styles.icon}
          key={'box1'}
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          exit={{ x: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <FontAwesomeIcon icon={faPenToSquare} size="1x" />
        </motion.div>
      ) : (
        <motion.div
          className={styles.icon}
          key={'box2'}
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          exit={{ x: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <FontAwesomeIcon icon={faCheck} size="1x" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function WidgetFirstOption({
  onClickEditor,
}: {
  onClickEditor: (optNum: OptNum, dataArr: DataArr<Method>) => () => void;
}) {
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
          <IconComponent />
        </div>
      </motion.div>
      <WidgetFirstOptionCategories />
    </motion.li>
  );
}
