import styles from '@/style/middle/menu/MenuList.module.css';
import { list_motion } from '../../../lib/motion/motion_mainPageMenuTab';

import { motion } from 'motion/react';

export default function Menu({ onClickOpenModal, list }) {
  const { name, price } = list;
  const menuPrice = price.toLocaleString();

  return (
    <motion.li className={styles.list} onClick={onClickOpenModal('update', list)} variants={list_motion}>
      <div className={styles.topBox}>
        <div className={styles.top}>
          <div className={styles.title}>{name}</div>
        </div>
      </div>
      <div className={styles.bottomBox}>
        <div className={styles.bottom}>
          <div className={styles.price}>{menuPrice}원</div>
        </div>
      </div>
    </motion.li>
  );
}
