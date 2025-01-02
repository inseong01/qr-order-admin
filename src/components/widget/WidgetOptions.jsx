import styles from '@/style/Widget.module.css';
import { widgetMenuList } from '../../lib/motion/motion_widgetMenu';
import { fetchTableListData } from '../../lib/features/submitState/submitSlice';
import { resetItemState } from '../../lib/features/itemState/itemSlice';
import { resetKonvaState } from '../../lib/features/konvaState/konvaSlice';
import { setWidgetListState, setWidgetEditState } from '../../lib/features/widgetState/widgetSlice';
import WidgetFirstOption from './firstOpt/WidgetFirstOption';
import WidgetSecondOption from './secondOpt/WidgetSecondOption';

import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

export default function WidgetOptions() {
  // useSelector
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const submitError = useSelector((state) => state.submitState.isError);
  const editTableType = useSelector((state) => state.konvaState.type);
  const editTableisEditing = useSelector((state) => state.konvaState.isEditing);
  // useDispatch
  const dispatch = useDispatch();

  function onClickEditor(optNum, dataArr) {
    return () => {
      if (isModalOpen || submitError) return;
      if (editTableisEditing) {
        // 좌석 수정 중 다른 옵션 실행(선택) 방지
        if (optNum !== 1) {
          alert('수정 중에 다른 옵션을 실행할 수 없습니다');
          return;
        }
        // 편집 저장, db 전송
        dispatch(fetchTableListData({ method: editTableType, dataArr }));
        dispatch(resetItemState());
        dispatch(resetKonvaState());
        dispatch(setWidgetEditState({ isEdit: false }));
      }
      dispatch(setWidgetListState({ optNum }));
    };
  }

  return (
    <motion.ul
      key={'widgetMenuList'}
      className={styles.widgetMenuList}
      variants={widgetMenuList}
      initial={'notClicked'}
      animate={'clicked'}
      exit={'notClicked'}
    >
      <WidgetFirstOption onClickEditor={onClickEditor} />
      <WidgetSecondOption onClickEditor={onClickEditor} />
    </motion.ul>
  );
}
