import { setWidgetEditState } from '../../lib/features/widgetState/widgetSlice';
import WidgetOptions from './WidgetOptions';

import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function WidgetOptionWrap() {
  // useSelector
  const editTableType = useSelector((state) => state.konvaState.type);
  const editTableisEditing = useSelector((state) => state.konvaState.isEditing);

  const clicked = useSelector((state) => state.widgetState.isWidgetOpen);

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

  // 탭 별 메뉴 항목 컴포넌트 하나로 병합
  return <AnimatePresence>{clicked && <WidgetOptions />}</AnimatePresence>;
}
