import styles from '@/style/Widget.module.css';
import WidgetCategoryList from './WidgetCategoryList';
import { fetchTableListData } from '../lib/features/submitState/submitSlice';
import { resetKonvaState } from '../lib/features/konvaState/konvaSlice';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { resetItemState } from '../lib/features/itemState/itemSlice';

export default function Widget() {
  // useState
  const [clicked, setClicked] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isClickEditor, setIsClickEditor] = useState(false);
  // useSelector
  const tab = useSelector((state) => state.tabState.state);
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const submitError = useSelector((state) => state.submitState.isError);
  const editTableisEditing = useSelector((state) => state.konvaState.isEditing);
  const editTableType = useSelector((state) => state.konvaState.type);
  const tableListData = useSelector((state) => state.itemState.clientTableList);
  // useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // 좌석 편집 시 저장 이미지로 전환
    switch (editTableType) {
      case 'create': {
        if (editTableisEditing) {
          setIsEdited((prev) => !prev);
        }
      }
      // 이미지 전환 editTableType 경우 추가
    }
  }, [editTableType, editTableType]);

  useEffect(() => {
    setClicked(false);
  }, [tab]);

  function onClickOpenWidgetList() {
    if (isModalOpen) return;
    if (editTableisEditing) {
      console.log('clicked');
      dispatch(resetItemState());
      dispatch(resetKonvaState());
    }
    setClicked((prev) => !prev);
    setIsClickEditor(false);
  }

  function onClickEditor() {
    if (isModalOpen || submitError) return;
    if (editTableisEditing) {
      // 편집 중 변경사항 있으면, db 전송
      dispatch(fetchTableListData({ method: 'insert', dataArr: tableListData }));
      dispatch(resetItemState());
      dispatch(resetKonvaState());
      setIsEdited((prev) => !prev);
    } else {
      setIsClickEditor((prev) => !prev);
    }
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
                <div className={styles.box}>
                  <AnimatePresence mode="wait">
                    {!isEdited ? (
                      <motion.img
                        src={'/img/edit-icon.png'}
                        alt="편집"
                        style={{ width: 20, height: 20 }}
                        key={'box1'}
                        initial={{ x: 20 }}
                        animate={{ x: 0 }}
                        exit={{ x: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    ) : (
                      <motion.img
                        src={'/img/checkmark.png'}
                        alt="편집 저장"
                        style={{ width: 20, height: 20 }}
                        key={'box2'}
                        initial={{ x: 20 }}
                        animate={{ x: 0 }}
                        exit={{ x: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <WidgetCategoryList isClickEditor={isClickEditor} />
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
