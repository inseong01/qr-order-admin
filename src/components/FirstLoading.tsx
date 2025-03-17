import styles from '@/style/FirstLoading.module.css';
import { Status } from '../lib/hook/useSubscribeDBTable';
import { InitLoadState } from '../types/common';
import Loader from './Loader';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

function ErrorTitleComponent() {
  return <div className={`${styles.title}`}>현재 서버에 문제가 발생했습니다</div>;
}

function SuccessTitleComponent() {
  const title = '환영합니다!';

  return <div className={styles.title}>{title}</div>;
}

function MountedComponent({ initialLoadstatus }: { initialLoadstatus: Status }) {
  return (
    <>{initialLoadstatus === 'success' ? <SuccessTitleComponent /> : <ErrorTitleComponent />}</>
  );
}

export default function FirstLoading({
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

    switch (initialLoadstatus) {
      case 'success': {
        setLoadComplete(true);
        break;
      }
      case 'error': {
        break;
      }
    }
  }, [isMounted]);

  return (
    <AnimatePresence>
      {!isCompleted && (
        <motion.div
          key={'fg'}
          className={styles.fg}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <div className={styles.box}>
            {isMounted ? <MountedComponent initialLoadstatus={initialLoadstatus} /> : <Loader />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
