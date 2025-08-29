import { ReactNode } from 'react';
import { motion } from 'motion/react';

import styles from './layout.module.css';

type DialogLayoutProps = {
  children: ReactNode;
  handleClose: () => void;
  isScaleUp?: boolean;
};

export default function DialogLayout({ children, handleClose, isScaleUp = true }: DialogLayoutProps) {
  return (
    <>
      <motion.dialog
        open
        className={styles.dialog}
        initial={{ scale: isScaleUp ? 0.85 : 1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: isScaleUp ? 0.85 : 1, opacity: 0 }}
        style={{ translateX: '-50%', translateY: '-50%' }}
      >
        {children}
      </motion.dialog>

      <motion.div
        className={styles.backdrop}
        onClick={handleClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      ></motion.div>
    </>
  );
}
