'use client';

import styles from '@/style/modal/AddMenuModal.module.css';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export default function AddMenuModal() {
  const type = 'edit'; // 'edit'일 때 input value 값 삽입
  const modalRef = useRef(null);

  useEffect(() => {
    console.log(modalRef.current);
    modalRef.current.showModal();
  }, []);

  function onClickCloseModal() {
    modalRef.current.close();
  }

  return (
    <motion.dialog className={styles.dialog} ref={modalRef} initial={{ size: 0 }} animate={{ size: 1 }}>
      <form className={styles.submitForm}>
        <input type="file" id="fileInput" className={styles.fileInput} hidden />
        <label htmlFor="fileInput" className={styles.left}>
          <div className={styles.iconBox}>
            <Image src={'/img/add-icon.png'} alt="사진 추가" width={25} height={25} />
          </div>
          <div className={styles.title}>{type === 'add' ? '사진 추가' : '사진 변경'}</div>
        </label>
        <div className={styles.right}>
          <div className={styles.title}>{type === 'add' ? '새로운 메뉴' : '현재 메뉴'}</div>
          <ul className={styles.submitInfo}>
            <li className={styles.info}>
              <label htmlFor="titleInput" className={styles.title}>
                상품명
              </label>
              <input required type="text" id="titleInput" className={styles.input} />
            </li>
            <li className={styles.info}>
              <label htmlFor="priceInput" className={styles.title}>
                금액
              </label>
              <input required type="number" id="priceInput" step={10} min={10} className={styles.input} />
            </li>
            <li className={styles.info}>
              <label htmlFor="descInput" className={styles.title}>
                설명
              </label>
              <input required type="text" id="descInput" className={styles.input} />
            </li>
          </ul>
          <input type="submit" className={styles.submit} value={type === 'add' ? '추가하기' : '수정하기'} />
        </div>
      </form>
      <div className={styles.closeBtn} onClick={onClickCloseModal}>
        <Image src={'/img/close.png'} alt="닫기" width={20} height={20} />
      </div>
    </motion.dialog>
  );
}
