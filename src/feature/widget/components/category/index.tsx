import { ReactNode } from 'react';
import { motion } from 'motion/react';

import { categoryMotion } from '../../motion/variants';

import styles from './index.module.css';

export default function Category({ children }: { children: ReactNode }) {
  return (
    <motion.li className={styles.listBox} key={'widgetMenu'} variants={categoryMotion}>
      {children}
    </motion.li>
  );
}
