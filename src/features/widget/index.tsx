import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';

import { windowStateAtom } from '@/store/atom/window-atom';

import { footerAtom } from '../page/footer';
import { MenuWidget } from './components/widget-menu';
import { TableWidget } from './components/widget-table';
import { WidgetIconButton } from './components/widget-button';
import { widgetAtom } from './store/atom';
import styles from './widget.module.css';

export default function Widget() {
  const tab = useAtomValue(footerAtom);
  const _window = useAtomValue(windowStateAtom);
  const { isOpen } = useAtomValue(widgetAtom);

  const components = {
    menu: MenuWidget,
    table: TableWidget,
    order: null,
  };
  const WidgetComponent = components[tab];
  const isWidgetComponentOn = WidgetComponent && (!_window.isMobile || _window.viewportMode === 'portrait');

  /* 모바일 위젯 등장 및 스타일링 작업 */

  return (
    <motion.div className={styles.widgetWrap} layout transition={{ duration: 0.3 }}>
      {/* 위젯 버튼 */}
      <WidgetIconButton />

      {/* 위젯 목록 */}
      <AnimatePresence>{isOpen ? isWidgetComponentOn && <WidgetComponent /> : null}</AnimatePresence>
    </motion.div>
  );
}
