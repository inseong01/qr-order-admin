import styles from '../style/UnderLine.module.css';
import { MenuCategoryList } from '../types/common';

import { motion } from 'motion/react';

export default function UnderLine({
  tab,
  selectedId,
  position,
}: {
  tab: MenuCategoryList;
  selectedId: number;
  position: string;
}) {
  return (
    <>
      {selectedId === tab.id && (
        <motion.div layoutId={position} className={`${styles.line} ${styles[position]}`}></motion.div>
      )}
    </>
  );
}
