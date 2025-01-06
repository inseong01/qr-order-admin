import styles from '@/style/modal/menu/DeleteCategory.module.css';

function Category({ category }) {
  const { id, title } = category;
  return (
    <li key={id} className={styles.list}>
      <label htmlFor={`sortList${id}CheckBox`}>
        <div className={styles.left}>{title}</div>
      </label>
      <input
        type="checkbox"
        name="check"
        id={`sortList${id}CheckBox`}
        className={styles.right}
        data-title={title}
        data-id={id}
      />
    </li>
  );
}

export default function DeleteCategory({ onSubmitData, categoryList }) {
  return (
    <form className={`${styles.submitForm}`} onSubmit={onSubmitData('category-menu')}>
      <div className={`${styles.sortModal}`}>
        <div className={styles.title}>분류 목록</div>
        <ul className={styles.submitInfo}>
          {categoryList?.map((category) => {
            return <Category key={category.id} category={category} />;
          })}
        </ul>
        <div className={styles.submitBtn}>
          <input type="submit" className={styles.btn} value={'삭제하기'} name={'delete'} />
        </div>
      </div>
    </form>
  );
}
