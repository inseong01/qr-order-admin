import styles from '../style/UnderLine.module.css';

import { motion } from 'motion/react';

export default function UnderLine({ tab, selectedId, position }) {
  return (
    <>
      {selectedId === tab?.id && (
        <motion.div layoutId={position} className={`${styles.line} ${styles[position]}`}></motion.div>
      )}
    </>
  );
}
