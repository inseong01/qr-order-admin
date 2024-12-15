import styles from '@/style/Widget.module.css';
import { menu } from '../../../lib/motion/motion_widgetMenu';
import WidgetSecondOptionCategory from './WidgetSecondOptionCategory';

import { motion } from 'motion/react';

export default function WidgetSecondOption({ onClickEditor }) {
  return (
    <motion.li className={styles.listBox} variants={menu}>
      <motion.div className={styles.list} key={'list'} onClick={onClickEditor(2)}>
        <div className={styles.iconBox}>
          <div className={styles.icon}>
            <img src="/img/bell-icon.png" alt="요청알림" />
          </div>
        </div>
      </motion.div>
      <WidgetSecondOptionCategory />
    </motion.li>
  );
}
