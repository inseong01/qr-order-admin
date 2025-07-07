import { useRef } from 'react';
import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { useBoundStore } from '../../../lib/store/use-bound-store';

import { footerAtom } from '../page/footer';

import styles from './modal-main.module.css';

import MenuModalRouter from '../../features/menu/components/menu-modal';
import TableModalRouter from '../../features/table/components/table-modal';

export default function MainModal() {
  const modalRef = useRef<HTMLDialogElement>(null);

  const tab = useAtomValue(footerAtom) ?? 'menu';
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  const changeModalState = useBoundStore((state) => state.changeModalState);

  const component = {
    menu: MenuModalRouter,
    table: TableModalRouter,
    order: null,
  };
  const ModalForm = component[tab];

  function onClickCloseModal() {
    changeModalState({ isOpen: false });
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* 모달창 */}
          <motion.dialog
            open={isModalOpen}
            className={styles.dialog}
            ref={modalRef}
            key={'dialog'}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{ translateX: '-50%', translateY: '-50%' }}
          >
            {/* 탭 별 폼 형식 */}
            {ModalForm ? <ModalForm /> : null}

            {/* 닫는 버튼 */}
            <div className={styles.closeBtn} onClick={onClickCloseModal}>
              <FontAwesomeIcon icon={faXmark} size='lg' />
            </div>
          </motion.dialog>

          {/* 배경 */}
          <motion.div
            className={styles.backdrop}
            key={'backdrop'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
