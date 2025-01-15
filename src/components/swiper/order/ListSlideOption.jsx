import styles from '@/style/swiper/order/ListSlideOption.module.css';
import { useBoundStore } from '../../../lib/store/useBoundStore';

import { AnimatePresence, motion } from 'motion/react';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            <FontAwesomeIcon icon={faCircleXmark} size="xl" />
          </li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
