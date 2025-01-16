import styles from '@/style/modal/menu/InsertCategory.module.css';
import TypeCategoryInfo from './TypeCategoryInfo';

export default function InsertCategory({ type, onSubmitData, onChangeInputValue }) {
  return (
    <form className={`${styles.submitForm} ${styles.category}`} onSubmit={onSubmitData}>
      <div className={`${styles.sortModal}`}>
        <div className={styles.title}>분류명</div>
        <ul className={styles.submitInfo}>
          <TypeCategoryInfo type={type} onChangeInputValue={onChangeInputValue} />
        </ul>

        <div className={styles.submitBtn}>
          <input
            type="submit"
            className={styles.btn}
            value={type === 'insert' ? '추가하기' : '수정하기'}
            name={'insert'}
          />
        </div>
      </div>
    </form>
  );
}
