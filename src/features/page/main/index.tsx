import { Suspense } from 'react';
import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';

import TabModalContainer from '@/features/modal/tab';
import { tabModalAtom } from '@/features/modal/tab/store/atom';
import { MenuTabView, OrderTabView, TableTabView } from '@/features/tab';
import LoadingSpinner from '@/features/load/spinner';
import Widget from '@/features/widget';

import { footerAtom } from '../footer';
import styles from './index.module.css';

export default function Main() {
  const tab = useAtomValue(footerAtom);
  const currentModal = useAtomValue(tabModalAtom);

  const component = {
    menu: MenuTabView,
    table: TableTabView,
    order: OrderTabView,
  };
  const MainPageComponent = component[tab];

  return (
    <main className={styles.main}>
      <Suspense fallback={<LoadingSpinner />}>
        {component ? (
          <>
            <div className={styles.leftBox}>
              <MainPageComponent />
            </div>

            <div className={styles.rightBox}>
              <AnimatePresence mode='wait'>
                {currentModal ? (
                  <motion.div
                    key='withModal'
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                    style={{ display: 'flex' }}
                  >
                    <Widget />
                    <TabModalContainer />
                  </motion.div>
                ) : (
                  <motion.div
                    key='withoutModal'
                    initial={{ x: 0 }}
                    animate={{ x: '100%' }}
                    exit={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ display: 'flex' }}
                  >
                    <Widget />
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

//  <AnimatePresence mode='wait'>

//               {/* 위젯 */}
//               <motion.div
//                 key={'withModal'}
//                 initial={{ x: 350 }}
//                 animate={{ x: 0 }}
//                 exit={{ x: 350 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Widget />
//               </motion.div>

//               {currentModal ? (
//                 <motion.div
//                   key={'withModal'}
//                   initial={{ x: '100%' }}
//                   animate={{ x: 0 }}
//                   exit={{ x: '100%' }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   {/* 모달 */}
//                   <TabModalContainer />
//                 </motion.div>
//               ) : null}
//             </AnimatePresence>
