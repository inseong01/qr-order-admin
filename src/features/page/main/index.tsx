import { Suspense } from 'react';
import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';

import { menuAtom } from '@/components/ui/menu/store/atom';
import { windowStateAtom } from '@/store/atom/window-atom';
import { modalOpenAtom } from '@/features/modal/tab/store/atom';
import TabModalContainer from '@/features/modal/tab';
import LoadingSpinner from '@/features/load/spinner';
import TabViewContainer from '@/features/tab';
import Widget from '@/features/widget';

import { footerAtom } from '../footer';
import styles from './index.module.css';

export default function Main() {
  const category = useAtomValue(footerAtom);
  const { isMobile, mainSection } = useAtomValue(windowStateAtom);

  return (
    <main className={styles.main}>
      <Suspense fallback={<LoadingSpinner />}>
        {category ? (
          <>
            {/* 좌측 */}
            <div className={styles.leftBox} style={{ width: mainSection.width }}>
              <TabViewContainer />
            </div>

            {/* 우측 */}
            {!isMobile && <MainRightComponent />}
          </>
        ) : (
          '예기치 않은 오류가 발생했습니다.'
        )}
      </Suspense>
    </main>
  );
}

/** 모달, 위젯 반환하는 메인 페이지 우측 컴포넌트 */
function MainRightComponent() {
  const category = useAtomValue(footerAtom);
  const isModalOpen = useAtomValue(modalOpenAtom);
  const selectedMenu = useAtomValue(menuAtom);

  return (
    <div className={styles.rightBox}>
      {/* 위젯 */}
      {category !== 'order' && <Widget />}

      {/* 모달 */}
      <AnimatePresence mode='popLayout'>
        {/* motion layout, <TabmodalContainer /> 내부로 이동하면 Widget layout 적용되지 않음 */}
        {isModalOpen && (
          <motion.div
            layout
            key={selectedMenu.id}
            initial={{ x: 385 }}
            animate={{ x: 0 }}
            exit={{ x: 385 }}
            transition={{ duration: 0.3 }}
          >
            <TabModalContainer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
