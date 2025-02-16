import styles from '@/style/modal/menu/UpdateCategory.module.css';
import { MenuCategoryList } from '../../../types/common';
import { OnSubmitDataEvent } from '../../../lib/hook/useModalSubmitData';

function CategoryComponent({ category }: { category: MenuCategoryList }) {
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

export default function UpdateCategory({
  onSubmitData,
  categoryList,
}: {
  onSubmitData: (e: OnSubmitDataEvent) => Promise<void>;
  categoryList: MenuCategoryList[];
}) {
  return (
    <form className={`${styles.submitForm}`} onSubmit={onSubmitData}>
      <div className={`${styles.sortModal}`}>
        <div className={styles.title}>분류 목록</div>
        <ul className={styles.submitInfo}>
          {categoryList?.map((category) => {
            return <CategoryComponent key={category.id} category={category} />;
          })}
        </ul>
        <div className={styles.submitBtn}>
          <input
            type="submit"
            className={`${styles.btn} ${styles.delete}`}
            value={'삭제하기'}
            name={'delete'}
          />
          <input type="submit" className={styles.btn} value={'수정하기'} name={'update'} />
        </div>
      </div>
    </form>
  );
}
