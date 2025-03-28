import styles from '@/style/modal/ConfirmModal.module.css';
import { useBoundStore } from '../../lib/store/useBoundStore';
import { ConfirmModalTitle } from '../../types/common';
import ConfirmButton from './confirm/ConfirmButton';
import ConfirmTitle from './confirm/ConfirmTitle';

import { AnimatePresence, motion } from 'motion/react';

export default function ConfirmModal({ title }: { title: ConfirmModalTitle }) {
  // store
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  const tab = useBoundStore((state) => state.tab.title);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          <motion.dialog
            open={isModalOpen}
            className={styles.dialog}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{ translateX: '-50%', translateY: '-50%' }}
          >
            <ConfirmTitle title={title} />
            <ConfirmButton title={title} />
          </motion.dialog>
          {tab !== 'menu' && (
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
