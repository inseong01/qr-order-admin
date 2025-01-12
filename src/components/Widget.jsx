import styles from '@/style/Widget.module.css';
import { useBoundStore } from '../lib/store/useBoundStore';
import WidgetMenuWrap from './widget/WidgetOptionWrap';
import WidgetBtn from './widget/WidgetBtn';

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export default function Widget() {
  // useRef
  const widgetRef = useRef(null);
  // useSelector
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const isTableEditAble = useSelector((state) => state.konvaState.isAble);
  // hook
  const tab = useBoundStore((state) => state.tab.id);
  const isWidgetOpen = useBoundStore((state) => state.widget.isOpen);
  const resetWidgetState = useBoundStore((state) => state.resetWidgetState);

  // 외부 선택으로 위젯 닫기
  useEffect(() => {
    function onClickWindowToCloseWidget(e) {
      if (isModalOpen) return;
      const isWindowClicked = e.target.offsetParent !== widgetRef.current; // offsetParent = widgetWrap
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
    <div className={styles.widgetWrap} ref={widgetRef}>
      <WidgetBtn />
      <WidgetMenuWrap />
    </div>
  );
}
