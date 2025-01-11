import styles from '../style/underLine.module.css';

import { motion } from 'motion/react';

export default function UnderLine({ tab, selectedId, position }) {
  return (
    <>
      {selectedId === tab?.id && <motion.div className={`${styles.line} ${styles[position]}`}></motion.div>}
    </>
  );
}
