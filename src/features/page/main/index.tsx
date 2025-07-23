import { Suspense } from 'react';
import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';

import { modalOpenAtom, tabModalAtom } from '@/features/modal/tab/store/atom';
import TabModalContainer from '@/features/modal/tab';
import LoadingSpinner from '@/features/load/spinner';
import TabViewContainer from '@/features/tab';
import Widget from '@/features/widget';

import { footerAtom } from '../footer';
import styles from './index.module.css';

export default function Main() {
  const category = useAtomValue(footerAtom);
  const isModalOpen = useAtomValue(modalOpenAtom);
  const currentModal = useAtomValue(tabModalAtom);

  return (
    <main className={styles.main}>
      <Suspense fallback={<LoadingSpinner />}>
        {category ? (
          <>
            {/* 좌측 */}
            <div className={styles.leftBox}>
              <TabViewContainer />
            </div>

            {/* 우측 */}
            <div className={styles.rightBox}>
              {/* 위젯 */}
              <Widget />

              {/* 모달 */}
              <AnimatePresence mode='popLayout'>
                {/* motion layout, <TabmodalContainer /> 내부로 이동하면 Widget layout 적용되지 않음 */}
                {isModalOpen && (
                  <motion.div
                    layout
                    key={currentModal}
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
          </>
        ) : (
          '예기치 않은 오류가 발생했습니다.'
        )}
      </Suspense>
    </main>
  );
}
