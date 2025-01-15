import styles from '@/style/Widget.module.css';
import { menu } from '../../../lib/motion/motion_widgetMenu';
import WidgetSecondOptionCategory from './WidgetSecondOptionCategory';

import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default function WidgetSecondOption({ onClickEditor }) {
  return (
    <motion.li className={styles.listBox} variants={menu}>
      <motion.div className={styles.list} key={'list'} onClick={onClickEditor(2)}>
        <div className={styles.iconBox}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faBell} size="lg" />
          </div>
        </div>
      </motion.div>
      <WidgetSecondOptionCategory />
    </motion.li>
  );
}
