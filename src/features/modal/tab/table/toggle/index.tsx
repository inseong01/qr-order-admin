import { useAtomValue, useSetAtom } from 'jotai';
import { motion } from 'motion/react';

import { setTableToggleAtom, tableToggleAtom } from '../../store/atom';

import styles from './index.module.css';

export default function ToggleDisplay() {
  const isToggled = useAtomValue(tableToggleAtom);
  const setToggle = useSetAtom(setTableToggleAtom);

  function onClickChangeBox() {
    setToggle();
  }

  return (
    <div className={`${styles.toggleBox} ${isToggled ? '' : styles.off}`} onClick={onClickChangeBox}>
      <motion.div layout className={styles.toggle}></motion.div>
    </div>
  );
}
