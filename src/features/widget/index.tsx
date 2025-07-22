import { useRef } from 'react';
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

  const widgetRef = useRef(null);

  const components = {
    menu: MenuWidget,
    table: TableWidget,
    order: null,
  };
  const WidgetComponent = components[tab];

  return (
    <AnimatePresence>
      {WidgetComponent && (!_window.isMobile || _window.viewportMode === 'portrait') && (
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
              opacity: 1,
            },
          }}
        >
          {/* 위젯 버튼 */}
          <WidgetIconButton />

          {/* 위젯 목록 */}
          <AnimatePresence>{isOpen ? <WidgetComponent /> : null}</AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
