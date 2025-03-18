import styles from '@/style/modal/menu/UpdateCategory.module.css';
import { MenuCategoryList } from '../../../types/common';
import { useBoundStore } from '../../../lib/store/useBoundStore';
import { OnSubmitDataEvent } from '../../../lib/hook/useModalSubmitData';

import { MouseEvent } from 'react';

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
  const changeModalState = useBoundStore((state) => state.changeModalState);

  function onClickOpenModal(e: MouseEvent) {
    e.preventDefault();
    changeModalState({ type: 'insert-category', isOpen: true });
  }

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
          <input
            type="submit"
            className={`${styles.btn} ${styles.create}`}
            value={'추가하기'}
            name={'insert'}
            onClick={onClickOpenModal}
          />
        </div>
      </div>
    </form>
  );
}
