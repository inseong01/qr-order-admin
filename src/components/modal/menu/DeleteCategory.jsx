import styles from '@/style/modal/menu/DeleteCategory.module.css';

export default function DeleteCategory({ onSubmitData, categoryList }) {
  return (
    <form className={`${styles.submitForm}`} onSubmit={onSubmitData('category-menu')}>
      <div className={`${styles.sortModal}`}>
        <div className={styles.title}>분류 목록</div>
        <ul className={styles.submitInfo}>
          {categoryList.data.map((category, i) => {
            return (
              <li key={category.id} className={styles.list}>
                <label htmlFor={`sortList${i}CheckBox`}>
                  <div className={styles.left}>{category.title}</div>
                </label>
                <input
                  type="checkbox"
                  name="check"
                  id={`sortList${i}CheckBox`}
                  className={styles.right}
                  data-title={category.title}
                  data-id={category.id}
                />
              </li>
            );
          })}
        </ul>
        <div className={styles.submitBtn}>
          <input type="submit" className={styles.btn} value={'삭제하기'} name={'delete'} />
        </div>
      </div>
    </form>
  );
}
