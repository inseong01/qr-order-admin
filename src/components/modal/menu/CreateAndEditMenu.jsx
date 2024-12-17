import styles from '@/style/modal/menu/CreateAndEditMenu.module.css';

import { useSelector } from 'react-redux';

export default function CreateAndEditMenu({ onSubmitData, onChangeInputValue, value, categoryList }) {
  const modalType = useSelector((state) => state.modalState.type); // 기본: '', 'add'/'edit'/'category'
  const categoryTitle = useSelector((state) => state.categoryState.title);

  return (
    <form className={styles.submitForm} onSubmit={onSubmitData('menu')}>
      <input type="file" id="fileInput" className={styles.fileInput} hidden />
      <label htmlFor="fileInput" className={styles.left}>
        <div className={styles.iconBox}>
          <img src={'/img/img-add-icon.png'} alt="사진 추가" style={{ width: 25, height: 25 }} />
        </div>
        <div className={styles.title}>{modalType === 'add' ? '사진 추가' : '사진 변경'}</div>
      </label>
      <div className={styles.right}>
        <div className={styles.title}>{modalType === 'add' ? '새로운 메뉴' : '현재 메뉴'}</div>
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
              onChange={onChangeInputValue('add/edit')}
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
              onChange={onChangeInputValue('add/edit')}
            />
          </li>
          <li className={styles.info}>
            <label htmlFor="sortSelect" className={styles.title}>
              분류
            </label>
            <select
              id="sortSelect"
              className={styles.input}
              name="sort"
              onChange={onChangeInputValue('add/edit')}
              defaultValue={modalType === 'add' ? categoryTitle : value.sort}
            >
              {categoryList.data.map((category) => {
                return (
                  <option key={category.id} value={category.sort}>
                    {category.title}
                  </option>
                );
              })}
            </select>
          </li>
        </ul>
        <div className={styles.submitBtn}>
          {modalType !== 'add' && (
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
            value={modalType === 'add' ? '추가하기' : '수정하기'}
            name={modalType === 'add' ? 'insert' : 'update'}
          />
        </div>
      </div>
    </form>
  );
}
