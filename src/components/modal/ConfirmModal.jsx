'use client';

import styles from '@/style/modal/ConfirmModal.module.css';
import { useEffect, useRef } from 'react';

export default function ConfirmModal() {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current.showModal();
  }, []);

  function onClickChangeModalStatus(status) {
    return () => {
      switch (status) {
        case 'no': {
          return modalRef.current.close();
        }
        case 'yes': {
          return modalRef.current.close();
        }
      }
    };
  }

  return (
    <dialog className={styles.dialog} ref={modalRef}>
      <div className={styles.title}>수정하시겠습니까?</div>
      <ul className={styles.btnBox}>
        <li className={styles.btn} onClick={onClickChangeModalStatus('no')}>
          아니요
        </li>
        <li className={styles.btn} onClick={onClickChangeModalStatus('yes')}>
          예
        </li>
      </ul>
    </dialog>
  );
}
