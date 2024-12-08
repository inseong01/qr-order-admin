import styles from '@/style/Widget.module.css';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useSelector } from 'react-redux';
import WidgetCategoryList from './WidgetCategoryList';

export default function Widget() {
  // useState
  const [clicked, setClicked] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isClickEditor, setIsClickEditor] = useState(false);
  // useSelector
  const tab = useSelector((state) => state.tabState.state);
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const submitError = useSelector((state) => state.submitState.isError);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsEdited((prev) => !prev);
  //   }, 2000);
  // }, []);

  useEffect(() => {
    setClicked(false);
  }, [tab]);

  function onClickOpenWidgetList() {
    if (isModalOpen) return;
    setClicked((prev) => !prev);
    setIsClickEditor(false);
  }

  function onClickEditor() {
    if (submitError || submitError) return;
    setIsClickEditor((prev) => !prev);
  }

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
  const menu = {
    clicked: { y: 0, opacity: 1 },
    notClicked: { y: 10, opacity: 0 },
  };

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.widget} onClick={onClickOpenWidgetList}>
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
      <AnimatePresence mode="wait">
        {clicked && (
          <motion.ul
            key={'widgetMenuList'}
            className={styles.widgetMenuList}
            variants={widgetMenuList}
            initial={'notClicked'}
            animate={'clicked'}
            exit={'notClicked'}
          >
            <motion.li className={styles.list} variants={menu}>
              <div className={styles.iconBox} onClick={onClickEditor}>
                <AnimatePresence mode="wait">
                  {!isEdited ? (
                    <motion.div key={'box1'} className={styles.box} initial={{ x: 0 }} exit={{ x: -20 }}>
                      <img src={'/img/edit-icon.png'} alt="편집" style={{ width: 20, height: 20 }} />
                    </motion.div>
                  ) : (
                    <motion.div key={'box2'} className={styles.box} initial={{ x: 20 }} animate={{ x: 0 }}>
                      <img src={'/img/checkmark.png'} alt="편집 저장" style={{ width: 20, height: 20 }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <WidgetCategoryList isClickEditor={isClickEditor} />
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
