import { ReactNode } from 'react';
import { motion } from 'motion/react';

import { optionMotion } from '../../motion/variants';

import styles from './index.module.css';

export default function Option({ children, openEditor }: { children: ReactNode; openEditor?: () => void }) {
  return (
    <motion.li className={styles.option} variants={optionMotion} onClick={openEditor}>
      {children}
    </motion.li>
  );
}
