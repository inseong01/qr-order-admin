import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';

import { tabModalAtom } from '../store/atom';
import CreateMenuModal from './create';
import UpdateMenuModal from './update';

export default function MenuModal() {
  const currentModal = useAtomValue(tabModalAtom);

  return (
    <AnimatePresence initial={false}>
      {currentModal === 'menu-create' ? (
        <motion.div
          layout
          key={'menu-modal-1'}
          initial={{ x: 385 }}
          animate={{ x: 0 }}
          exit={{ x: 385 }}
          transition={{ duration: 0.3 }}
          style={{ height: '100%' }}
        >
          <CreateMenuModal />
        </motion.div>
      ) : (
        <motion.div
          layout
          key={'menu-modal-2'}
          initial={{ x: 385 }}
          animate={{ x: 0 }}
          exit={{ x: 385 }}
          transition={{ duration: 0.3 }}
          style={{ height: '100%' }}
        >
          <UpdateMenuModal />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
