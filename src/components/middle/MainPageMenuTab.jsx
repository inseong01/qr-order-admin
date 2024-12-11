import styles from '@/style/middle/MainPageList.module.css';
import MenuList from './MenuList';
import AddMenuModal from '../modal/AddMenuModal';

import { motion } from 'motion/react';

export default function MainPageMenuTab() {
  // motion
  const ul_motion = {
    load: {},
    notLoad: {},
  };

  return (
    <>
      <motion.ul className={styles.listBox} variants={ul_motion} initial={'notLoad'} animate={'load'}>
        <MenuList />
      </motion.ul>
      <AddMenuModal />
    </>
  );
}
