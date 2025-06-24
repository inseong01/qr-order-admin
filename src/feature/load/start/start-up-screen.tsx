import { Dispatch, SetStateAction, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { LoadStatus } from '../../../hook/use-subscribe-table';

import { InitLoadState } from '../../../types/common';

import styles from './start-up-screen.module.css';
import LoadingSpinner from '../spinner/spinner-index';

export default function StartUpScreen({
  state,
  setLoadComplete,
}: {
  state: InitLoadState;
  setLoadComplete: Dispatch<SetStateAction<boolean>>;
}) {
  const { isMounted, initialLoadstatus, isCompleted } = state;

  // DB 데이터 패치 상태
  useEffect(() => {
    if (!isMounted) return;

    setLoadComplete(true);
  }, [isMounted]);

  return (
    <AnimatePresence>
      {!isCompleted && (
        <motion.div key={'fg'} className={styles.fg} exit={{ opacity: 0 }} transition={{ duration: 1, delay: 2 }}>
          <div className={styles.box}>
            {isMounted ? <LoadStatusMessage status={initialLoadstatus} /> : <LoadingSpinner />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LoadStatusMessage({ status }: { status: LoadStatus }) {
  const title = status === 'success' ? '환영합니다!' : '현재 서버에 문제가 발생했습니다';

  return <div className={styles.title}>{title}</div>;
}
