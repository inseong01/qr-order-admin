import styles from '@/style/modal/menu/CreateAndEditMenu.module.css';

import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function CreateAndEditMenu({ onSubmitData, onChangeInputValue, value, categoryList }) {
  // useSelector
  const modalType = useSelector((state) => state.modalState.type);
  const categoryTitle = useSelector((state) => state.categoryState.title);
  // useRef
  const imgBox = useRef(null);
  // useState
  const [isPrevImg, setPrevImg] = useState(false);

  function onChangeShowPrevImage(e) {
    const reader = new FileReader();
    setPrevImg(true);
    reader.onload = ({ target }) => {
      imgBox.current.src = target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <form className={styles.submitForm} onSubmit={onSubmitData('menu')}>
      <input
        type="file"
        id="fileInput"
        className={styles.fileInput}
        name="url"
        accept=".png, .jpg"
        onChange={onChangeShowPrevImage}
        hidden
      />
      <label htmlFor="fileInput" className={styles.left}>
        {!isPrevImg ? (
          <>
            <div className={`${styles.iconBox} `}>
              <img src={'/img/img-add-icon.png'} alt="사진 추가" />
            </div>
            <div className={styles.title}>{modalType === 'insert' ? '사진 추가' : '사진 변경'}</div>
          </>
        ) : (
          <div className={styles.prevImgBox}>
            <img ref={imgBox} alt="미리보기" />
          </div>
        )}
      </label>
      <div className={styles.right}>
        <div className={styles.title}>{modalType === 'insert' ? '새로운 메뉴' : '현재 메뉴'}</div>
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
              name="name"
              onChange={onChangeInputValue('insert/update')}
              placeholder="음식 이름을 입력해주세요"
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
              value={value.price === 0 ? 0 : value.price}
              name="price"
              onChange={onChangeInputValue('insert/update')}
            />
          </li>
          <li className={styles.info}>
            <label htmlFor="sortSelect" className={styles.title}>
              분류
            </label>
            <select
              required
              id="sortSelect"
              className={styles.input}
              name="sort"
              onChange={onChangeInputValue('insert/update')}
              defaultValue={value.sort ? value.sort : categoryTitle === '전체메뉴' ? '' : categoryTitle}
            >
              <option value={''} disabled>
                분류를 선택해주세요
              </option>
              {categoryList.data.slice(1).map((category) => {
                const title = category.title === '전체메뉴' ? '' : category.title;
                return (
                  <option key={category.id} value={title} disabled={category.title === '전체메뉴'}>
                    {category.title}
                  </option>
                );
              })}
            </select>
          </li>
        </ul>
        <div className={styles.submitBtn}>
          {modalType !== 'insert' && (
            <input
              type="submit"
              className={`${styles.btn} ${styles.delete}`}
              value={'삭제하기'}
              name="delete"
            />
          )}
          <input
            type="submit"
            className={styles.btn}
            value={modalType === 'insert' ? '추가하기' : '수정하기'}
            name={modalType === 'insert' ? 'insert' : 'update'}
          />
        </div>
      </div>
    </form>
  );
}
