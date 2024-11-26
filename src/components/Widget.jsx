'use client';

import styles from '@/style/Widget.module.css';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export default function Widget() {
  const [clicked, setClicked] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsEdited((prev) => !prev);
  //   }, 2000);
  // }, []);

  // motion
  const iconBoxVariant = {
    clicked: {},
    notClicked: {},
  };
  const firstSpanVariant = {
    clicked: {
      rotateZ: 45,
      y: 6,
    },
    notClicked: {
      rotateZ: 0,
      y: 0,
    },
  };
  const middleSpanVariant = {
    clicked: {
      opacity: 0,
    },
    notClicked: {
      opacity: 1,
    },
  };
  const lastSpanVariant = {
    clicked: {
      rotateZ: -45,
      y: -6,
    },
    notClicked: {
      rotateZ: 0,
      y: 0,
    },
  };

  const widgetMenuList = {
    clicked: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    notClicked: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };
  const menuList = {
    clicked: { y: 0, opacity: 1 },
    notClicked: { y: 10, opacity: 0 },
  };

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.widget} onClick={() => setClicked((prev) => !prev)}>
        <motion.div
          className={styles.iconBox}
          variants={iconBoxVariant}
          initial={clicked ? 'notClicked' : 'notClicked'}
          animate={clicked ? 'clicked' : 'notClicked'}
        >
          <motion.span variants={firstSpanVariant}></motion.span>
          <motion.span variants={middleSpanVariant}></motion.span>
          <motion.span variants={lastSpanVariant}></motion.span>
        </motion.div>
      </div>
      <AnimatePresence>
        {clicked && (
          <motion.ul
            key={'widgetMenuList'}
            className={styles.widgetMenuList}
            variants={widgetMenuList}
            initial={'notClicked'}
            animate={'clicked'}
            exit={'notClicked'}
          >
            <motion.li className={styles.list} variants={menuList}>
              <div className={styles.iconBox}>
                <AnimatePresence mode="wait">
                  {!isEdited ? (
                    <motion.div key={'box1'} className={styles.box} initial={{ x: 0 }} exit={{ x: -20 }}>
                      <Image src={'/img/edit-icon.png'} alt="편집" width={20} height={20} />
                    </motion.div>
                  ) : (
                    <motion.div key={'box2'} className={styles.box} initial={{ x: 20 }} animate={{ x: 0 }}>
                      <Image src={'/img/checkmark.png'} alt="편집" width={20} height={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
