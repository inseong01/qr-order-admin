import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { useBoundStore } from '../../lib/store/use-bound-store';

import styles from './widget-index.module.css';
import WidgetIconButton from './widget-button';
import WidgetCategoryPortal from './categories/categories-index';

export default function Widget() {
  const widgetRef = useRef(null);
  const tab = useBoundStore((state) => state.tab.id);
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  const isWidgetOpen = useBoundStore((state) => state.widget.isOpen);
  const isTableEditAble = useBoundStore((state) => state.konva.isAble);
  const isMobile = useBoundStore((state) => state.windowState.isMobile);
  const viewportMode = useBoundStore((state) => state.windowState.viewportMode);
  const resetWidgetState = useBoundStore((state) => state.resetWidgetState);

  // 외부 선택으로 위젯 닫기
  useEffect(() => {
    function onClickWindowToCloseWidget(e: MouseEvent) {
      if (!e.target) return;
      const target = e.target as HTMLElement;

      // 모달 열려 있을 때 클릭 방지
      if (isModalOpen) return;

      // icon(path) 클릭 시 닫기 방지
      const isNodePath = target.tagName === 'path' || target.tagName === 'svg';
      if (isNodePath) return;

      const isWindowClicked = target.offsetParent !== widgetRef.current; // offsetParent = widgetWrap

      // 카테고리 delete 모달에서 버튼 선택 시 하단 조건 적용됨
      if (isWidgetOpen && isWindowClicked && !isTableEditAble) {
        resetWidgetState();
      }
    }
    window.addEventListener('click', onClickWindowToCloseWidget);

    return () => window.removeEventListener('click', onClickWindowToCloseWidget);
  }, [isWidgetOpen, isTableEditAble, isModalOpen]);

  // tab 전환될 때
  useEffect(() => {
    resetWidgetState();
  }, [tab]);

  return (
    <AnimatePresence>
      {(!isMobile || viewportMode === 'portrait') && (
        <motion.div
          className={styles.widgetWrap}
          ref={widgetRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 위젯 버튼 */}
          <WidgetIconButton />

          {/* 위젯 목록 */}
          <WidgetCategoryPortal />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
