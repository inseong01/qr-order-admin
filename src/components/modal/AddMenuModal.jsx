'use client';

import styles from '@/style/modal/AddMenuModal.module.css';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { changeModalState } from '@/lib/features/modalState/modalSlice';
import { changeSubmitType, fetchFormData } from '@/lib/features/submitState/submitSlice';

const valueObj = {
  name: '',
  price: 0,
  description: '',
};

export default function AddMenuModal() {
  // useSelector
  const type = useSelector((state) => state.modalState.type); // 기본: ''
  const isOpen = useSelector((state) => state.modalState.isOpen);
  const item = useSelector((state) => state.itemState.item);
  const submitStatus = useSelector((state) => state.submitState.status);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  // dispatch
  const dispatch = useDispatch();
  // useState
  const [value, setValue] = useState({});
  // useRef
  const modalRef = useRef(null);

  // input value 업데이트
  useEffect(() => {
    setValue(item);
  }, [item]);

  // 제출 완료 되면 모달 닫기
  useEffect(() => {
    if (submitStatus === 'fulfilled') {
      dispatch(changeModalState({ isOpen: false }));
    }
  }, [submitStatus]);

  function onClickCloseModal() {
    dispatch(changeModalState({ isOpen: false }));

    modalRef.current.close();
  }

  function onChangeInputValue(e) {
    const target = e.target.name;
    setValue((prev) => {
      return {
        ...prev,
        [target]: e.target.value,
      };
    });
  }

  function onSubmitData(e) {
    e.preventDefault();
    if (isSubmit) return;
    dispatch(changeSubmitType({ type: 'product' }));
    dispatch(fetchFormData(value));
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
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
            <form className={styles.submitForm} onSubmit={onSubmitData}>
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
                    <label htmlFor="nameInput" className={styles.title}>
                      상품명
                    </label>
                    <input
                      required
                      type="text"
                      id="nameInput"
                      className={styles.input}
                      value={value.name}
                      // value={type === 'edit' ? value.name : undefined}
                      name="name"
                      onChange={onChangeInputValue}
                    />
                  </li>
                  <li className={styles.info}>
                    <label htmlFor="priceInput" className={styles.title}>
                      금액
                    </label>
                    <input
                      required
                      type="number"
                      id="priceInput"
                      step={10}
                      min={10}
                      className={styles.input}
                      value={value.price === 0 ? '' : value.price}
                      // value={type === 'edit' ? value.price : undefined}
                      name="price"
                      onChange={onChangeInputValue}
                    />
                  </li>
                  <li className={styles.info}>
                    <label htmlFor="descInput" className={styles.title}>
                      설명
                    </label>
                    <input
                      type="text"
                      id="descInput"
                      className={styles.input}
                      value={value.description}
                      // value={type === 'edit' ? value.description : undefined}
                      name="description"
                      onChange={onChangeInputValue}
                    />
                  </li>
                </ul>
                <input
                  type="submit"
                  className={styles.submit}
                  value={type === 'add' ? '추가하기' : '수정하기'}
                />
              </div>
            </form>
            <div className={styles.closeBtn} onClick={onClickCloseModal}>
              <Image src={'/img/close.png'} alt="닫기" width={20} height={20} />
            </div>
          </motion.dialog>
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
