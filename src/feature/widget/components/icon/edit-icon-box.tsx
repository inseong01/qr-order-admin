import { ReactNode } from 'react';
import { motion } from 'motion/react';

import styles from './icon.module.css';

export default function EditAnimationIconBox({ children, iconKey }: { children: ReactNode; iconKey: string }) {
  return (
    <motion.div
      className={styles.icon}
      key={iconKey}
      initial={{ x: 20 }}
      animate={{ x: 0 }}
      exit={{ x: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
