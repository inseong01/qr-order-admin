import styles from '@/style/Widget.module.css';
import { fetchTableListData } from '../../lib/features/submitState/submitSlice';
import { resetItemState } from '../../lib/features/itemState/itemSlice';
import { resetKonvaState } from '../../lib/features/konvaState/konvaSlice';
import { menu, widgetMenuList } from '../../lib/motion/motion_widgetMenu';
import WidgetCategoryList from './WidgetCategoryList';
import { setWidgeListState, setWidgetEditState } from '../../lib/features/widgetState/widgetSlice';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTableRequestListAlertOn } from '../../lib/features/realtimeState/realtimeSlice';

export default function WidgetMenu() {
  // useSelector
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const submitError = useSelector((state) => state.submitState.isError);
  const tableListData = useSelector((state) => state.itemState.clientTableList);
  const tableIdArr = useSelector((state) => state.konvaState.target.id);
  const editTableType = useSelector((state) => state.konvaState.type);
  const editTableisEditing = useSelector((state) => state.konvaState.isEditing);

  const clicked = useSelector((state) => state.widgetState.isWidgetOpen);
  const isEdited = useSelector((state) => state.widgetState.isEdit);
  const firstOption = useSelector((state) => state.widgetState.isWidgetListOpen.firstOption);
  const secondOption = useSelector((state) => state.widgetState.isWidgetListOpen.secondOption);
  const thirdOption = useSelector((state) => state.widgetState.isWidgetListOpen.thirdOption);

  // dispatch
  const dispatch = useDispatch();

  // 좌석 편집 시 저장 이미지로 전환
  useEffect(() => {
    if (!editTableType) return;
    if (editTableisEditing) {
      dispatch(setWidgetEditState({ isEdit: true }));
    } else {
      dispatch(setWidgetEditState({ isEdit: false }));
    }
  }, [editTableType, editTableisEditing]);

  function onClickEditor(optNum) {
    return () => {
      if (isEdited) return;
      if (isModalOpen || submitError) return;
      if (editTableisEditing) {
        // 편집 저장, db 전송
        const dataArr = editTableType !== 'delete' ? tableListData : tableIdArr;
        dispatch(fetchTableListData({ method: editTableType, dataArr }));
        dispatch(resetItemState());
        dispatch(resetKonvaState());
        dispatch(setWidgetEditState({ isEdit: false }));
      } else {
        dispatch(setWidgeListState({ optNum }));
      }
    };
  }

  function onClickAlertEditor() {
    dispatch(setTableRequestListAlertOn());
  }
  // 탭 별 메뉴 항목 컴포넌트 하나로 병합
  return (
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
            <div className={styles.iconBox} onClick={onClickEditor(1)}>
              <div className={styles.box}>
                <AnimatePresence mode="wait">
                  {!firstOption || !isEdited ? (
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
            <WidgetCategoryList isClickEditor={firstOption} />
          </motion.li>
          <motion.li className={styles.list} variants={menu}>
            <div className={styles.iconBox} onClick={onClickEditor(2)}>
              <div className={styles.box}>🔔</div>
            </div>
            <motion.div className={styles.optionListBox}>
              <AnimatePresence>
                {secondOption && <div onClick={onClickAlertEditor}>toggle</div>}
              </AnimatePresence>
            </motion.div>
          </motion.li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
