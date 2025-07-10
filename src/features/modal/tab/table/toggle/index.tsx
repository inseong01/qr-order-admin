import { useAtomValue, useSetAtom } from 'jotai';
import { motion } from 'motion/react';

import { tableToggleAtom } from '../../store/atom';

import styles from './index.module.css';

export default function ToggleDisplay() {
  const isToggled = useAtomValue(tableToggleAtom);
  const setToggle = useSetAtom(tableToggleAtom);

  function onClickChangeBox() {
    setToggle(!isToggled);
  }

  return (
    <div className={`${styles.toggleBox} ${isToggled ? '' : styles.off}`} onClick={onClickChangeBox}>
      <motion.div layout className={styles.toggle}></motion.div>
    </div>
  );
}
