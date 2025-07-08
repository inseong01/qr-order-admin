import { useAtomValue, useSetAtom } from 'jotai';

import styles from './../index.module.css';

import { setMenuModalState } from '../store/atom';
import { resetMenuIdState, selectMenuIdState } from '@/store/atom/menu';

import mockData from '@/mock/data.test.json';

export default function CreateMenuModal() {
  const menuId = useAtomValue(selectMenuIdState);
  const setModalState = useSetAtom(setMenuModalState);
  const resetMenuId = useSetAtom(resetMenuIdState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClose = () => {
    setModalState({ isOpen: false });
    resetMenuId();
  };

  const currentMenu = mockData.filter((m) => m.id === menuId);

  return (
    <form className={styles.addMenuModal} onSubmit={handleSubmit}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h2 className={styles.modalTitle}>음식 추가</h2>
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

            <input type='text' id='foodName' placeholder='음식명을 입력해주세요.' />
          </label>

          <label className={styles.inputWrapper} htmlFor='category'>
            <span className={styles.inputTitle}>분류</span>

            <select className={styles.options} id='category'>
              <option>분류 1</option>
              <option>분류 2</option>
              <option>분류 3</option>
            </select>
          </label>

          <label className={styles.inputWrapper} htmlFor='price'>
            <span className={styles.inputTitle}>가격</span>

            <input type='text' id='price' placeholder='가격을 입력해주세요.' />
          </label>

          <label className={styles.inputWrapper} htmlFor='status'>
            <span className={styles.inputTitle}>판매 상태</span>

            <select className={styles.options} id='status'>
              <option>신규</option>
              <option>인기</option>
              <option>품절</option>
            </select>
          </label>
        </div>
      </div>

      <div className={styles.submitBox}>
        <button type='submit' className={styles.submit} style={{ backgroundColor: '#4caff8' }}>
          추가하기
        </button>
      </div>
    </form>
  );
}
