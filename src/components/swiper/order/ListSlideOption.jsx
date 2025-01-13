import styles from '@/style/swiper/order/ListSlideOption.module.css';
import { useBoundStore } from '../../../lib/store/useBoundStore';

import { AnimatePresence, motion } from 'motion/react';

export default function ListSlideOption({ list }) {
  // store
  const selectedListId = useBoundStore((state) => state.itemBox.selectedListId);
  const getSelectedListId = useBoundStore((state) => state.getSelectedListId);

  function onClickCloseListOption(e) {
    e.stopPropagation();
    getSelectedListId({ selectedListId: '' });
  }

  return (
    <AnimatePresence>
      {selectedListId === list.id && (
        <motion.ul
          className={styles.listOptionBox}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          style={{ x: '-50%', y: 12, transform: 'translateX(-50%)' }}
        >
          <li className={styles.option} onClick={onClickCloseListOption}>
            <img src={'/img/close-icon.webp'} alt="옵션 닫기" style={{ width: 30, height: 30 }} />
          </li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
