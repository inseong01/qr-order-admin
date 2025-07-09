import { useRef } from 'react';
import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';

import { footerAtom } from '../page/footer';

import { windowStateAtom } from '@/store/atom/window-atom';
import { widgetAtom } from '@/store/atom/widget-atom';

import styles from './widget.module.css';

import { MenuWidget, TableWidget, WidgetIconButton } from './components';

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
              opacity: 0,
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
