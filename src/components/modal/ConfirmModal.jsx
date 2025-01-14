import styles from '@/style/modal/ConfirmModal.module.css';
import { useBoundStore } from '../../lib/store/useBoundStore';

import { AnimatePresence, motion } from 'motion/react';

function ConfirmButton({ title }) {
  // store
  const selectedList = useBoundStore((state) => state.itemBox.list);
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const submitMsgType = useBoundStore((state) => state.submit.msgType);
  const changeModalState = useBoundStore((state) => state.changeModalState);
  const fetchOrderListStatus = useBoundStore((state) => state.fetchOrderListStatus);
  const fetchFormCategoryItem = useBoundStore((state) => state.fetchFormCategoryItem);

  // 카테고리 삭제, 주문 상태 완료 처리
  function onClickChangeModalStatus(state) {
    return () => {
      switch (state) {
        case 'no': {
          changeModalState({ isOpen: false });
          return;
        }
        case 'yes': {
          // 반복 제출 방지
          if (isSubmit) return;
          const method = submitMsgType === 'delete' ? 'delete' : 'update';
          if (title === '주문') {
            fetchOrderListStatus({ method, data: selectedList });
          } else if (title === '카테고리') {
            fetchFormCategoryItem({ method, itemInfo: selectedList, table: 'category-menu' });
          }
        }
      }
    };
  }

  return (
    <ul className={styles.btnBox}>
      <li className={styles.btn} onClick={onClickChangeModalStatus('no')}>
        아니요
      </li>
      <li className={styles.btn} onClick={onClickChangeModalStatus('yes')}>
        예
      </li>
    </ul>
  );
}

function ConfirmTitle({ title }) {
  // store
  const tab = useBoundStore((state) => state.tab.title);
  const selectedList = useBoundStore((state) => state.itemBox.list);
  const submitMsgType = useBoundStore((state) => state.submit.msgType);
  // variant
  const context = submitMsgType === 'delete' ? '삭제' : title === '주문' ? '완료' : '수정';
  const subTitlte = tab === 'menu' ? selectedList.map((list) => list.title).join(', ') : '';
  return (
    <div className={styles.title}>
      {title}을 {context}하시겠습니까?
      {subTitlte && (
        <div className={styles.subTitlteBox}>
          <span className={`${styles.caption} ${styles.subTitlte}`} title={subTitlte}>
            &#91; {subTitlte} &#93;
          </span>
          <span className={styles.caption}>
            카테고리와 관련된 메뉴들도 <span className={styles.caution}>일괄 삭제</span>됩니다
          </span>
        </div>
      )}
    </div>
  );
}

export default function ConfirmModal({ title }) {
  // store
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);

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
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
