import { motion } from 'motion/react';

import { MenuCategoryList } from '../../../types/common';

import styles from './line-index.module.css';

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
