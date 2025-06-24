import { motion, AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { useBoundStore } from '../../../../lib/store/use-bound-store';
import { OptionNumList } from '../../../../lib/store/slices/widget-slice';
import { TableDataArr } from '../../../../lib/supabase/function/fetch-table';
import { FetchMethod } from '../../../../lib/store/slices/fetch-slice';

import styles from './../../widget-index.module.css';

import { categoryMotion } from '../../motion/variants';

import FirstMenuCategory from './menu-category';
import FirstTableCategory from './table-category';

export default function WidgetFirstCategory({
  onClickEditor,
}: {
  onClickEditor: (optNum: OptionNumList, dataArr: TableDataArr<FetchMethod>) => () => void;
}) {
  const tableListData = useBoundStore((state) => state.itemBox.clientTableList);
  const editTableType = useBoundStore((state) => state.konva.type);
  const tableIdArr = useBoundStore((state) => state.konva.target.id);
  const isEdit = useBoundStore((state) => state.widget.isEdit);

  const dataArr = editTableType === 'delete' ? tableIdArr : tableListData;

  return (
    <motion.li className={styles.listBox} key={'widgetMenu'} variants={categoryMotion}>
      <motion.div className={styles.list} key={'list'} onClick={onClickEditor(1, dataArr)}>
        {/* 아이콘 */}
        <div className={styles.iconBox}>
          <AnimatePresence mode='wait' initial={false}>
            {!isEdit ? (
              <motion.div
                className={styles.icon}
                key={'box1'}
                initial={{ x: 20 }}
                animate={{ x: 0 }}
                exit={{ x: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <FontAwesomeIcon icon={faPenToSquare} size='1x' />
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
                <FontAwesomeIcon icon={faCheck} size='1x' />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 첫번째 카테고리 목록 */}
      <FirstCategoriesOptions />
    </motion.li>
  );
}

function FirstCategoriesOptions() {
  const tab = useBoundStore((state) => state.tab.title);

  switch (tab) {
    case 'menu': {
      return <FirstMenuCategory />;
    }
    case 'table': {
      return <FirstTableCategory />;
    }
    case 'order': {
      return <></>;
    }
  }
}
