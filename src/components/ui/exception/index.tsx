import { motion } from 'motion/react';

import styles from './index.module.css';

type ExceptionTextProps = {
  text: string;
};

export function ExceptionText({ text }: ExceptionTextProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.title}>
      {text}
    </motion.div>
  );
}
