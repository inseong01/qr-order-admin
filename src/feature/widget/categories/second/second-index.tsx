import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import { useBoundStore } from '../../../../lib/store/use-bound-store';
import { OptionNumList } from '../../../../lib/store/slices/widget-slice';
import { TableDataArr } from '../../../../lib/supabase/function/fetch-table';
import { FetchMethod } from '../../../../lib/store/slices/fetch-slice';

import styles from './../../widget-index.module.css';

import { categoryMotion } from '../../motion/variants';

import SecondTableCategory from './menu-category';

export default function WidgetSecondCategory({
  onClickEditor,
}: {
  onClickEditor: (optNum: OptionNumList, dataArr?: TableDataArr<FetchMethod>) => () => void;
}) {
  return (
    <motion.li className={styles.listBox} variants={categoryMotion}>
      {/* 아이콘 */}
      <motion.div className={styles.list} key={'list'} onClick={onClickEditor(2)}>
        <div className={styles.iconBox}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faBell} size='1x' />
          </div>
        </div>
      </motion.div>

      {/* 두번째 카테고리 목록 */}
      <SecondCategoriesOptions />
    </motion.li>
  );
}

function SecondCategoriesOptions() {
  const tab = useBoundStore((state) => state.tab.title);

  switch (tab) {
    case 'menu': {
      return <SecondTableCategory />;
    }
    case 'table': {
      return <SecondTableCategory />;
    }
    case 'order': {
      return <SecondTableCategory />;
    }
  }
}
