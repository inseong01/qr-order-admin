import { ReactNode } from 'react';
import { motion } from 'motion/react';

import { categories } from '../../motion/variants';

import styles from './index.module.css';

export default function CategoryGroup({ children }: { children: ReactNode }) {
  return (
    <motion.ul
      key={'categories'}
      className={styles.categories}
      variants={categories}
      initial={'notClicked'}
      animate={'clicked'}
      exit={'notClicked'}
    >
      {children}
    </motion.ul>
  );
}
