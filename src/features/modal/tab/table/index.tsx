import { lazy, Suspense } from 'react';
import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';

import { idAtom } from '@/store/id-atom';
import LoadingSpinner from '@/features/load/spinner';
import { useQueryTableList } from '@/hooks/use-query/table/query';

import styles from './index.module.css';

const LazyTableInfoContents = lazy(() => import('./table-info'));

export default function TableInfoPannel() {
  const tableId = useAtomValue(idAtom);
  const tables = useQueryTableList();

  const table = tables.data?.find((t) => t.id === tableId);

  return (
    <AnimatePresence initial={false} mode='popLayout'>
      <motion.div
        layout
        key={table?.id}
        initial={{ x: 385 }}
        animate={{ x: 0 }}
        exit={{ x: 385 }}
        transition={{ duration: 0.3 }}
        style={{ height: '100%' }}
      >
        <form className={styles.submitForm} onSubmit={() => {}} data-testid='submitForm'>
          <Suspense fallback={<LoadingSpinner position='absolute' />}>
            <LazyTableInfoContents />
          </Suspense>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
