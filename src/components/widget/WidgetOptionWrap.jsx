import { useBoundStore } from '../../lib/store/useBoundStore';
import WidgetOptions from './WidgetOptions';

import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function WidgetOptionWrap() {
  // useSelector
  const editTableType = useSelector((state) => state.konvaState.type);
  const editTableisEditing = useSelector((state) => state.konvaState.isEditing);
  // hook
  const setWidgetEditState = useBoundStore((state) => state.setWidgetEditState);
  const isWidgetOpen = useBoundStore((state) => state.widget.isOpen);

  // 좌석 편집 시 저장 이미지로 전환
  useEffect(() => {
    if (!editTableType) return;
    if (editTableisEditing) {
      setWidgetEditState(true);
    } else {
      setWidgetEditState(false);
    }
  }, [editTableType, editTableisEditing]);

  // 탭 별 메뉴 항목 컴포넌트 하나로 병합
  return <AnimatePresence>{isWidgetOpen && <WidgetOptions />}</AnimatePresence>;
}
