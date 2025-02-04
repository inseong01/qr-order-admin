import { useBoundStore } from '../../lib/store/useBoundStore';
import WidgetOptions from './WidgetOptions';

import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

export default function WidgetOptionWrap() {
  const isWidgetOpen = useBoundStore((state) => state.widget.isOpen);
  const editTableType = useBoundStore((state) => state.konva.type);
  const editTableisEditing = useBoundStore((state) => state.konva.isEditing);
  const setWidgetEditState = useBoundStore((state) => state.setWidgetEditState);

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
