import { useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { modalAtom, setModalState } from '@/store/atom/modal-atom';

import { footerAtom } from '../../page/footer';

import styles from './index.module.css';
import TableInfoPannel from '../table';

// import MenuModalRouter from '../../features/menu/components/menu-modal';
/* 
  위젯 모달 전용
*/
export default function MainModal() {
  const modalRef = useRef<HTMLDialogElement>(null);

  const tab = useAtomValue(footerAtom);
  const { isOpen } = useAtomValue(modalAtom);
  const setModal = useSetAtom(setModalState);

  const component = {
    // menu: MenuModalRouter, // 메뉴탭, 위젯 카테고리 때 필요
    table: TableInfoPannel,
    order: null,
  };
  const ModalForm = component[tab];

  function onClickCloseModal() {
    setModal({ isOpen: false });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 모달창 */}
          <motion.dialog
            open={isOpen}
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
