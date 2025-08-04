import { ReactNode } from 'react';
import { motion } from 'motion/react';

import styles from './index.module.css';

type ListBoxProps = {
  children: ReactNode;
  isDataEmpty: boolean;
  sectionWidth: number;
  tab: 'menu' | 'table' | 'order';
};

export function ListUlBox({ children, isDataEmpty, sectionWidth, tab }: ListBoxProps) {
  return (
    <motion.ul
      className={styles.box}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      data-empty={isDataEmpty}
      data-tab={tab}
      style={{ width: isDataEmpty ? sectionWidth : 'auto' }}
    >
      {children}
    </motion.ul>
  );
}
