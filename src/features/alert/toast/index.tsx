import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { AnimatePresence } from 'motion/react';

import DialogLayout from '@/components/layout/dialog';

import { toastStateAtom } from './store/atom';
import styles from './index.module.css';

export default function ToastNotification() {
  const [alertState, setAlertState] = useAtom(toastStateAtom);
  const { '*': params } = useParams();
  const titleArr = alertState.title.split('.').slice(0, -1);

  const handleClose = () => {
    // params 있으면 배경 클릭 닫기 제한('/': undefined)
    if (params) return;
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  };

  /** 모달 닫기 timeout 설정 */
  useEffect(() => {
    if (!alertState.isOpen) return;

    const timeout = setTimeout(() => {
      setAlertState((prev) => ({ ...prev, isOpen: false }));
    }, 1300);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [alertState.isOpen]);

  return (
    <AnimatePresence>
      {alertState.isOpen && (
        <DialogLayout handleClose={handleClose} isScaleUp={false}>
          {/* 알림 */}
          {titleArr.map((t, idx: number) => {
            return (
              <div key={idx} className={styles.textBox}>
                <span>{t}.</span>
              </div>
            );
          })}
        </DialogLayout>
      )}
    </AnimatePresence>
  );
}
