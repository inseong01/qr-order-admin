import { useAtomValue } from 'jotai';
import { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import LoadingSpinner from '@/features/load/spinner';

import styles from './index.module.css';
import { tabModalAtom } from '../store/atom';

const LazyCreateMenuModal = lazy(() => import('./create'));
const LazyUpdateMenuModal = lazy(() => import('./update'));

export default function MenuModal() {
  const currentModal = useAtomValue(tabModalAtom);

  return (
    <AnimatePresence initial={false}>
      {currentModal === 'menu-create' ? (
        <motion.div
          layout
          className={styles.menuModalBox}
          key={'menu-modal-1'}
          initial={{ x: 385 }}
          animate={{ x: 0 }}
          exit={{ x: 385 }}
          transition={{ duration: 0.3 }}
          style={{ height: '100%' }}
        >
          <Suspense fallback={<LoadingSpinner position='absolute' />}>
            <LazyCreateMenuModal />
          </Suspense>
        </motion.div>
      ) : (
        <motion.div
          layout
          className={styles.menuModalBox}
          key={'menu-modal-2'}
          initial={{ x: 385 }}
          animate={{ x: 0 }}
          exit={{ x: 385 }}
          transition={{ duration: 0.3 }}
          style={{ height: '100%' }}
        >
          <Suspense fallback={<LoadingSpinner position='absolute' />}>
            <LazyUpdateMenuModal />
          </Suspense>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
