import styles from '@/style/middle/MainPageList.module.css';
import MenuList from './MenuList';
import MainModal from '../modal/MainModal';
import { ul_motion } from '../../lib/motion/motion_mainPageMenuTab';

import { motion } from 'motion/react';

export default function MainPageMenuTab() {
  return (
    <>
      <motion.ul className={styles.listBox} variants={ul_motion} initial={'notLoad'} animate={'load'}>
        <MenuList />
      </motion.ul>
      <MainModal />
    </>
  );
}
