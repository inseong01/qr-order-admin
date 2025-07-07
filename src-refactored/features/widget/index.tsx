import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { useBoundStore } from '../../../lib/store/use-bound-store';

import { footerAtom } from '../page/footer';

import styles from './widget.module.css';

import { MenuWidget, TableWidget, WidgetIconButton, widgetOpenAtom } from './components';

export default function Widget() {
  const tab = useAtomValue(footerAtom);
  const isWidgetOpen = useAtomValue(widgetOpenAtom);
  const setWidgetOpenStatus = useSetAtom(widgetOpenAtom);

  const widgetRef = useRef(null);
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  const isTableEditAble = useBoundStore((state) => state.konva.isAble);
  const isMobile = useBoundStore((state) => state.windowState.isMobile);
  const viewportMode = useBoundStore((state) => state.windowState.viewportMode);

  const components = {
    menu: MenuWidget,
    table: TableWidget,
    order: null,
  };
  const WidgetComponent = components[tab];

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
        setWidgetOpenStatus(false);
      }
    }
    window.addEventListener('click', onClickWindowToCloseWidget);

    return () => window.removeEventListener('click', onClickWindowToCloseWidget);
  }, [isWidgetOpen, isTableEditAble, isModalOpen]);

  return (
    <AnimatePresence>
      {WidgetComponent && (!isMobile || viewportMode === 'portrait') && (
        <motion.div
          ref={widgetRef}
          className={styles.widgetWrap}
          initial={'notClicked'}
          animate={'clicked'}
          exit={'notClicked'}
          variants={{
            clicked: {
              opacity: 1,
            },
            notClicked: {
              opacity: 0,
            },
          }}
        >
          {/* 위젯 버튼 */}
          <WidgetIconButton />

          {/* 위젯 목록 */}
          <AnimatePresence>{isWidgetOpen ? <WidgetComponent /> : null}</AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
