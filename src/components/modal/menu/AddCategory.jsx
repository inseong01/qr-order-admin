import styles from '@/style/modal/menu/AddCategory.module.css';

export default function AddCategory({ onSubmitData, onChangeInputValue }) {
  return (
    <form className={`${styles.submitForm} ${styles.category}`} onSubmit={onSubmitData('category-menu')}>
      <div className={`${styles.sortModal}`}>
        <div className={styles.title}>분류명</div>
        <ul className={styles.submitInfo}>
          <li className={styles.info}>
            <input
              required
              type="text"
              className={styles.input}
              name="title"
              onChange={onChangeInputValue('category')}
              placeholder="분류명을 입력해주세요"
            />
          </li>
        </ul>
        <div className={styles.submitBtn}>
          <input type="submit" className={styles.btn} value={'추가하기'} name={'insert'} />
        </div>
      </div>
    </form>
  );
}
