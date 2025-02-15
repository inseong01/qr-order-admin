import styles from '@/style/middle/MainPageList.module.css';
import { ul_motion } from '../../../lib/motion/motion_mainPageMenuTab';
import MenuLi from './MenuLi';

import { motion } from 'motion/react';

export default function MenuSection() {
  return (
    <motion.ul className={styles.listBox} variants={ul_motion} initial={'notLoad'} animate={'load'}>
      <MenuLi />
    </motion.ul>
  );
}
