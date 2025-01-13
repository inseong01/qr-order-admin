import styles from '@/style/Widget.module.css';
import { widgetMenuList } from '../../lib/motion/motion_widgetMenu';
import { fetchTableListData } from '../../lib/features/submitState/submitSlice';
import { useBoundStore } from '../../lib/store/useBoundStore';
import WidgetFirstOption from './firstOpt/WidgetFirstOption';
import WidgetSecondOption from './secondOpt/WidgetSecondOption';

import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

export default function WidgetOptions() {
  // useDispatch
  const dispatch = useDispatch();
  // store
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const submitError = useBoundStore((state) => state.submit.isError);
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  const editTableType = useBoundStore((state) => state.konva.type);
  const editTableisEditing = useBoundStore((state) => state.konva.isEditing);
  const resetItemState = useBoundStore((state) => state.resetItemState);
  const resetKonvaState = useBoundStore((state) => state.resetKonvaState);
  const setWidgetEditState = useBoundStore((state) => state.setWidgetEditState);
  const setWidgetOptionListState = useBoundStore((state) => state.setWidgetOptionListState);

  function onClickEditor(optNum, dataArr) {
    return () => {
      if (isModalOpen || submitError) return;
      if (editTableisEditing) {
        if (isSubmit) return;
        // 좌석 수정 중 다른 옵션 실행(선택) 방지
        if (optNum !== 1) {
          alert('수정 중에 다른 옵션을 실행할 수 없습니다');
          return;
        }
        // 편집 저장, db 전송
        dispatch(fetchTableListData({ method: editTableType, dataArr }));
        resetItemState();
        resetKonvaState();
        setWidgetEditState(false);
        return;
      }
      // 위젯 옵션 여닫기
      setWidgetOptionListState({ optNum });
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
