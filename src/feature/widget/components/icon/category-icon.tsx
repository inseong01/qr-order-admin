import { ReactNode } from 'react';
import { motion } from 'motion/react';

import styles from './icon.module.css';

export default function CategoryIcon({ children, clickEditor }: { children: ReactNode; clickEditor: () => void }) {
  return (
    <motion.div className={styles.list} key={'list'} onClick={clickEditor}>
      <div className={styles.iconBox}>{children}</div>
    </motion.div>
  );
}
