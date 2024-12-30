import styles from '../style/underLine.module.css';

import { motion } from 'motion/react';

export default function UnderLine({ list, selectedId, position }) {
  return (
    <>
      {selectedId === list.id && (
        <motion.div
          className={`${styles.line} ${styles[position]}`}
          layoutId={position === 'bottom' ? 'headerline' : 'footerLine'}
        ></motion.div>
      )}
    </>
  );
}
