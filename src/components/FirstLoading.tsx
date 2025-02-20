import styles from '@/style/FirstLoading.module.css';
import { Status } from '../lib/hook/useSubscribeDBTable';
import Loader from './Loader';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

function ErrorTitleComponent() {
  return <div className={`${styles.title}`}>현재 서버에 문제가 발생했습니다</div>;
}

function SuccessTitleComponent() {
  return <div className={`${styles.title}`}>환영합니다!</div>;
}

function MountedComponent({ initialLoadstatus }: { initialLoadstatus: Status }) {
  return <>{initialLoadstatus === 'success' ? <SuccessTitleComponent /> : <ErrorTitleComponent />}</>;
}

export default function FirstLoading({
  isMounted,
  isCompleted,
  setLoadComplete,
  initialLoadstatus,
}: {
  isMounted: boolean;
  isCompleted: boolean;
  setLoadComplete: Dispatch<SetStateAction<boolean>>;
  initialLoadstatus: Status;
}) {
  // 문구 등장
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
