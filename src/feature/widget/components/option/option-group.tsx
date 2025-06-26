import { ReactNode } from 'react';
import { motion } from 'motion/react';

import { optionListMotion } from '../../motion/variants';

import styles from './index.module.css';

export default function OptionGroup({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <motion.ul
      key={'optionList'}
      className={styles.editorOption}
      variants={optionListMotion}
      initial={'notClicked'}
      animate={'clicked'}
      exit={'notClicked'}
      onClick={onClick}
    >
      {children}
    </motion.ul>
  );
}
