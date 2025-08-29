import { useAtomValue, useSetAtom } from 'jotai';
import { motion } from 'motion/react';

import LIGHT_LIST_UP_ICON from '@/assets/icon/light-list-up.svg';

import { setWidgetAtomState, widgetAtom } from '../../store/atom';
import { ListBox } from '../motion';
import styles from './index.module.css';

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
        <motion.img
          initial={{ rotateZ: 0 }}
          animate={{ rotateZ: isOpen ? 180 : 0 }}
          src={LIGHT_LIST_UP_ICON}
          alt='widget close icon'
        />
      </div>
    </ListBox>
  );
}
