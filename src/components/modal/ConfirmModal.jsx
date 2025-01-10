import styles from '@/style/modal/ConfirmModal.module.css';
import { fetchFormCategoryItem, fetchOrderListStatus } from '../../lib/features/submitState/submitSlice';
import { changeModalState } from '../../lib/features/modalState/modalSlice';

import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'motion/react';

function ConfirmButton({ title }) {
  // useSelector
  const selectedList = useSelector((state) => state.itemState.list);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  const submitMsgType = useSelector((state) => state.submitState.msgType);
  // useDispatch
  const dispatch = useDispatch();

  function onClickChangeModalStatus(state) {
    return () => {
      switch (state) {
        case 'no': {
          dispatch(changeModalState({ isOpen: false }));
          return;
        }
        case 'yes': {
          // 반복 제출 방지
          if (isSubmit) return;
          const method = submitMsgType === 'delete' ? 'delete' : 'update';
          if (title === '주문') {
            dispatch(fetchOrderListStatus({ method, data: selectedList }));
          } else if (title === '카테고리') {
            dispatch(fetchFormCategoryItem({ method, itemInfo: selectedList, table: 'category-menu' }));
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
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  const selectedList = useSelector((state) => state.itemState.list);
  const submitMsgType = useSelector((state) => state.submitState.msgType);
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
  // useSelector
  const isModalOpen = useSelector((state) => state.modalState.isOpen);

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
