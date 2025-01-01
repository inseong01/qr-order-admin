import styles from '@/style/Widget.module.css';
import { resetWidgetState, setWidgetState } from '../lib/features/widgetState/widgetSlice';
import WidgetMenuWrap from './widget/WidgetOptionWrap';
import WidgetBtn from './widget/WidgetBtn';

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Widget() {
  // useRef
  const widgetRef = useRef(null);
  // useSelector
  const tab = useSelector((state) => state.tabState.state);
  const isModalOpen = useSelector((state) => state.modalState.isOpen);
  const isTableEditAble = useSelector((state) => state.konvaState.isAble);
  const clicked = useSelector((state) => state.widgetState.isWidgetOpen);
  // useDispatch
  const dispatch = useDispatch();

  // 외부 선택으로 위젯 닫기
  useEffect(() => {
    function onClickWindowToCloseWidget(e) {
      if (isModalOpen) return;
      const isWindowClicked = e.target.offsetParent !== widgetRef.current; // offsetParent = widgetWrap
      if (clicked && isWindowClicked && !isTableEditAble) {
        dispatch(setWidgetState());
      }
    }
    window.addEventListener('click', onClickWindowToCloseWidget);

    return () => window.removeEventListener('click', onClickWindowToCloseWidget);
  }, [clicked, isTableEditAble, isModalOpen]);

  // tab 전환될 때
  useEffect(() => {
    dispatch(resetWidgetState());
  }, [tab]);

  return (
    <div className={styles.widgetWrap} ref={widgetRef}>
      <WidgetBtn />
      <WidgetMenuWrap />
    </div>
  );
}
