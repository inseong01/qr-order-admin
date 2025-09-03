import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';

import styles from './widget.module.css';
import { widgetAtom } from './store/atom';
import { MenuWidget } from './components/tab/menu';
import { WidgetIconButton } from './components/button';
import TableWidget from './components/tab/table';
import { footerAtom } from '../page/footer';
import { memo } from 'react';

function Widget() {
  const tab = useAtomValue(footerAtom);
  const { isOpen } = useAtomValue(widgetAtom);

  const components = {
    menu: MenuWidget,
    table: TableWidget,
    order: null,
  };
  const WidgetComponent = components[tab];
  const isWidgetComponentOn = !!WidgetComponent;

  return (
    <>
      <motion.div
        layout
        key={'widget'}
        className={styles.widgetWrap}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* 위젯 버튼 */}
        <WidgetIconButton />

        {/* 위젯 목록 */}
        <AnimatePresence>{isOpen ? isWidgetComponentOn && <WidgetComponent /> : null}</AnimatePresence>
      </motion.div>
    </>
  );
}

export default memo(Widget);
