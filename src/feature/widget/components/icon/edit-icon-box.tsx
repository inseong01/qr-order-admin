import { ReactNode } from 'react';
import { motion } from 'motion/react';

import styles from './icon.module.css';

export default function EditAnimationIconBox({ children, key }: { children: ReactNode; key: string }) {
  return (
    <motion.div
      className={styles.icon}
      key={key}
      initial={{ x: 20 }}
      animate={{ x: 0 }}
      exit={{ x: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
