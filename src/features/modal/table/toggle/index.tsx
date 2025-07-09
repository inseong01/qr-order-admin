import { useAtomValue, useSetAtom } from 'jotai';
import { motion } from 'motion/react';

import { setToggleState, toggleAtom } from '../store/atom';

import styles from './index.module.css';

export default function ToggleDisplay() {
  const isToggled = useAtomValue(toggleAtom);
  const setToggle = useSetAtom(setToggleState);

  function onClickChangeBox() {
    setToggle(!isToggled);
  }

  return (
    <div className={`${styles.toggleBox} ${isToggled ? '' : styles.off}`} onClick={onClickChangeBox}>
      <motion.div layout className={styles.toggle}></motion.div>
    </div>
  );
}
