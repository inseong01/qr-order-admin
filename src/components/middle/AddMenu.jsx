import styles from '@/style/middle/MenuList.module.css';
import { list_motion } from '../../lib/motion/motion_mainPageMenuTab';

import { motion } from 'motion/react';

export default function AddMenu({ onClickOpenModal }) {
  return (
    <motion.li
      className={`${styles.list} ${styles.addBtn}`}
      onClick={onClickOpenModal('insert')}
      variants={list_motion}
    >
      <img src={'/img/add-icon.png'} alt="상품 추가" />
      <div className="title">상품 추가</div>
    </motion.li>
  );
}
