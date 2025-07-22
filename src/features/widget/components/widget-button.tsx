import { useAtomValue, useSetAtom } from 'jotai';

import LIGHT_LIST_UP_ICON from '@/assets/icon/light-list-up.svg';

import { setWidgetAtomState, widgetAtom } from '../store/atom';
import styles from './components.module.css';
import { ListBox } from './motion';

/**
 * 위젯 버튼
 */
export function WidgetIconButton() {
  const { isOpen } = useAtomValue(widgetAtom);
  const setWidgetState = useSetAtom(setWidgetAtomState);

  // 위젯 열기/닫기
  function handleWidgetStatus() {
    setWidgetState({ isOpen: !isOpen });
  }

  return (
    <ListBox key='widgetButton' onClick={handleWidgetStatus} isRow={true} isAnimate={false}>
      <span>{isOpen ? '닫기' : '열기'}</span>

      <div className={styles.openIconBox}>
        <img src={LIGHT_LIST_UP_ICON} alt='widget close icon' data-flip={isOpen} />
      </div>
    </ListBox>
  );
}
