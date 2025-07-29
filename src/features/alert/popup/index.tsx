import { useAtom } from 'jotai';
import { AnimatePresence } from 'motion/react';

import DialogLayout from '@/components/layout/dialog';

import { submissionStatusAlertAtom } from './store/atom';
import styles from './index.module.css';

export default function SubmissionStatusAler() {
  const [alertState, setAlertState] = useAtom(submissionStatusAlertAtom);
  const titleArr = alertState.title.split('.');

  const handleClose = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AnimatePresence>
      {alertState.isOpen && (
        <DialogLayout handleClose={handleClose} isScaleUp={false}>
          {/* 알림 */}
          {titleArr.map((t, idx: number) => {
            return (
              <div key={idx} className={styles.textBox}>
                <span>{t}</span>
              </div>
            );
          })}
        </DialogLayout>
      )}
    </AnimatePresence>
  );
}
