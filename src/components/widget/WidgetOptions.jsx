import styles from '@/style/Widget.module.css';
import { widgetMenuList } from '../../lib/motion/motion_widgetMenu';
import { fetchTableListData } from '../../lib/features/submitState/submitSlice';
import { resetItemState } from '../../lib/features/itemState/itemSlice';
import { resetKonvaState } from '../../lib/features/konvaState/konvaSlice';
import { setWidgeListState, setWidgetEditState } from '../../lib/features/widgetState/widgetSlice';
import WidgetFirstOption from './firstOpt/WidgetFirstOption';
import WidgetSecondOption from './secondOpt/WidgetSecondOption';

import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

export default function WidgetOptions() {
  // useSelector
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const submitError = useSelector((state) => state.submitState.isError);
  const tableListData = useSelector((state) => state.itemState.clientTableList);
  const tableIdArr = useSelector((state) => state.konvaState.target.id);
  const editTableType = useSelector((state) => state.konvaState.type);
  const editTableisEditing = useSelector((state) => state.konvaState.isEditing);

  const isEdited = useSelector((state) => state.widgetState.isEdit);
  const thirdOption = useSelector((state) => state.widgetState.isWidgetListOpen.thirdOption);

  // useDispatch
  const dispatch = useDispatch();

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
