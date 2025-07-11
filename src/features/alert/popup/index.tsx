import { useAtom } from 'jotai';
import { AnimatePresence } from 'motion/react';

import { submissionStatusAlertAtom } from './store/atom';

import DialogLayout from '@/components/layout/dialog';

const SubmissionStatusAlert = () => {
  const [alertState, setAlertState] = useAtom(submissionStatusAlertAtom);

  const handleClose = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AnimatePresence>
      {alertState.isOpen && (
        <DialogLayout handleClose={handleClose} isScaleUp={false}>
          {/* 알림 */}
          <span>{alertState.title}</span>
        </DialogLayout>
      )}
    </AnimatePresence>
  );
};

export default SubmissionStatusAlert;
