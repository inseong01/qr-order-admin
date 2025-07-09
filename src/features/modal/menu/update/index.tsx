import { ChangeEvent, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';

import styles from './../index.module.css';

import { setMenuModalState } from '../store/atom';
import { resetIdState, idAtom } from '@/store/atom/id-atom';

import mockData from '@/mock/data.test.json';

const initInputValue = {
  menuName: '',
  menuPrice: 0,
  menuCategory: '',
  menuTag: '',
};

export default function UpdateMenuModal() {
  const [inputValue, setInputValue] = useState(initInputValue);

  const menuId = useAtomValue(idAtom);
  const setModalState = useSetAtom(setMenuModalState);
  const resetMenuId = useSetAtom(resetIdState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const getInputValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputValue((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleClose = () => {
    setModalState({ isOpen: false });
    resetMenuId();
  };

  const currentMenu = mockData.find((m) => m.id === menuId);

  return (
    <form className={styles.addMenuModal} onSubmit={handleSubmit}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h2 className={styles.modalTitle}>음식 수정</h2>
          <button type='button' className={styles.close} onClick={handleClose}>
            <img src='' alt='close icon' />
          </button>
        </div>

        <label className={styles.imgInput} htmlFor='thumbnail'>
          <button type='button' className={styles.iconBox} onClick={handleClose}>
            <img src='' alt='img input icon' />
          </button>

          <span>사진 첨부</span>

          <input type='file' id='thumbnail' hidden />
        </label>

        <div className={styles.main}>
          <label className={styles.inputWrapper} htmlFor='foodName'>
            <span className={styles.inputTitle}>음식명</span>

            <input
              type='text'
              id='foodName'
              name='menuName'
              onChange={getInputValue}
              value={currentMenu?.name}
              placeholder='음식명을 입력해주세요.'
            />
          </label>

          <label className={styles.inputWrapper} htmlFor='category'>
            <span className={styles.inputTitle}>분류</span>

            <select
              className={styles.options}
              id='category'
              name='menuCategory'
              onChange={getInputValue}
              value={currentMenu?.category_id}
            >
              <option value={'cat-001'}>분류 1</option>
              <option value={'cat-002'}>분류 2</option>
              <option value={'cat-003'}>분류 3</option>
              <option value={'cat-004'}>분류 4</option>
              <option value={'cat-005'}>분류 5</option>
              <option value={'cat-006'}>분류 6</option>
            </select>
          </label>

          <label className={styles.inputWrapper} htmlFor='price'>
            <span className={styles.inputTitle}>가격</span>

            <input
              type='text'
              id='price'
              name='menuPrice'
              onChange={getInputValue}
              placeholder='가격을 입력해주세요.'
              value={currentMenu?.price}
            />
          </label>

          <label className={styles.inputWrapper} htmlFor='status'>
            <span className={styles.inputTitle}>판매 상태</span>

            <select
              className={styles.options}
              id='status'
              name='menuTag'
              onChange={getInputValue}
              value={currentMenu?.tag}
            >
              <option value={'신규'}>신규</option>
              <option value={'인기'}>인기</option>
              <option value={'품절'}>품절</option>
            </select>
          </label>
        </div>
      </div>

      <div className={styles.submitBox}>
        <button type='submit' className={styles.submit} style={{ backgroundColor: '#da2b2e' }}>
          삭제하기
        </button>
        <button type='submit' className={styles.submit} style={{ backgroundColor: '#4caff8' }}>
          수정하기
        </button>
      </div>
    </form>
  );
}
