import styles from '@/style/modal/ConfirmModal.module.css';
import { fetchOrderListStatus, resetSubmitState } from '@/lib/features/submitState/submitSlice';

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ConfirmModal({ selectedList, clickedItemId }) {
  const context = selectedList.id === clickedItemId ? '삭제' : '완료';
  const list = selectedList;
  const selectedItemId = clickedItemId;
  // useRef
  const modalRef = useRef(null);
  // useSelector
  const alertType = useSelector((state) => state.submitState.alertType);
  // useDispatch
  const dispatch = useDispatch();

  function onClickChangeModalStatus(status) {
    return () => {
      switch (status) {
        case 'no': {
          dispatch(resetSubmitState());
          return;
        }
        case 'yes': {
          dispatch(fetchOrderListStatus({ list, selectedItemId }));
          return;
        }
      }
    };
  }

  return (
    <>
      {alertType === 'confirm' && (
        <>
          <dialog open={alertType === 'confirm'} className={styles.dialog} ref={modalRef}>
            <div className={styles.title}>주문을 {context}하시겠습니까?</div>
            <ul className={styles.btnBox}>
              <li className={styles.btn} onClick={onClickChangeModalStatus('no')}>
                아니요
              </li>
              <li className={styles.btn} onClick={onClickChangeModalStatus('yes')}>
                예
              </li>
            </ul>
          </dialog>
          <div className={styles.backdrop}></div>
        </>
      )}
    </>
  );
}
